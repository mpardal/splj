# Configuration Sanity — Paroisse Saint Pierre-Le-Jeune

## Vue d'ensemble

Sanity est le CMS (système de gestion de contenu) utilisé pour rédiger et publier le contenu
du site. Il se compose de deux parties :

- **Sanity Studio** : l'interface d'administration, accessible sur `/studio`
- **Content Lake** : la base de données hébergée par Sanity (cloud), interrogée par le site Next.js

---

## 1. Variables d'environnement (`.env.local`)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=jq4bejpu
NEXT_PUBLIC_SANITY_DATASET=production
```

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Identifiant unique du projet sur sanity.io. Visible dans l'URL du dashboard Sanity. |
| `NEXT_PUBLIC_SANITY_DATASET` | Nom du jeu de données. `production` est la valeur standard. On pourrait créer un dataset `staging` pour tester sans toucher au vrai contenu. |

Le préfixe `NEXT_PUBLIC_` est obligatoire pour que ces valeurs soient accessibles
côté navigateur (elles ne sont pas secrètes — l'API Sanity est publique en lecture).

---

## 2. Fichier de configuration principal (`sanity.config.ts`)

```ts
export default defineConfig({
  basePath: '/studio',   // URL du Studio dans l'appli Next.js
  projectId,
  dataset,
  schema,                // les types de documents (section, page...)
  plugins: [
    structureTool({ structure }),  // panneau de navigation du Studio
    visionTool({ defaultApiVersion: apiVersion }), // outil de requête GROQ
  ],
})
```

- **`basePath: '/studio'`** : le Studio est intégré directement dans l'appli Next.js.
  On y accède sur `http://localhost:3000/studio` en développement.
- **`structureTool`** : gère l'arborescence visible dans la barre latérale du Studio.
- **`visionTool`** : onglet "Vision" dans le Studio permettant d'écrire et tester
  des requêtes GROQ en direct sur le dataset.

---

## 3. Variables partagées (`src/sanity/env.ts`)

```ts
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-30'
export const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET      // obligatoire
export const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID   // obligatoire
```

- **`apiVersion`** : date au format `YYYY-MM-DD`. Sanity versionne son API par date ;
  figer cette valeur garantit que le site se comporte identiquement même si Sanity
  modifie son API à l'avenir. Mettre la date du jour lors d'un nouveau projet.

---

## 4. Client (`src/sanity/lib/client.ts`)

```ts
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
```

Le **client** est l'objet utilisé pour toutes les requêtes vers le Content Lake.

- **`useCdn: true`** : les réponses passent par le CDN de Sanity (cache global).
  Recommandé pour les pages rendues côté serveur avec `revalidate`.
  Mettre `false` si on a besoin de données toujours fraîches (ex : prévisualisation).

---

## 5. Live Content API (`src/sanity/lib/live.ts`)

```ts
export const { sanityFetch, SanityLive } = defineLive({ client })
```

- **`sanityFetch`** : alternative au `client.fetch` classique. Met à jour le contenu
  en temps réel sans recharger la page (utile pour la prévisualisation dans le Studio).
- **`SanityLive`** : composant React à placer dans le layout pour activer
  la connexion temps réel.

> Pour l'instant ces exports ne sont pas encore utilisés dans le site.
> Ils seront utiles quand on voudra activer la prévisualisation live depuis le Studio.

---

## 6. Utilitaire image (`src/sanity/lib/image.ts`)

```ts
export const urlFor = (source: SanityImageSource) => builder.image(source)
```

Les images dans Sanity ne sont pas des URLs directes — elles sont stockées comme
références. `urlFor` convertit cette référence en URL utilisable, avec possibilité
de redimensionner et recadrer à la volée :

```ts
// Exemples d'utilisation
urlFor(page.image).width(800).height(400).url()
urlFor(page.image).width(400).auto('format').url()
```

---

## 7. Schémas de contenu (`src/sanity/schemaTypes/`)

Les schémas définissent la **structure des documents** dans Sanity.

### `section` (src/sanity/schemaTypes/section.ts)

Représente une **catégorie de menu** (ex : Sacrements, Liturgie, Formations...).

| Champ | Type | Rôle |
|---|---|---|
| `title` | string | Nom affiché (obligatoire) |
| `slug` | slug | Identifiant URL, ex: `sacrements` (obligatoire) |
| `description` | text | Description optionnelle de la section |
| `order` | number | Ordre d'affichage dans le Studio |

**Exemple :** créer une section avec `title = "Sacrements"` génère automatiquement
le slug `sacrements`, ce qui donnera les URLs `/sacrements/...`.

### `page` (src/sanity/schemaTypes/page.ts)

Représente une **page de contenu** du site.

| Champ | Type | Rôle |
|---|---|---|
| `title` | string | Titre de la page (obligatoire) |
| `slug` | slug | Identifiant URL, ex: `bapteme-enfants` (obligatoire) |
| `section` | reference → section | Section parente. **Laisser vide** pour une page de premier niveau (`/don`, `/art-histoire`) |
| `order` | number | Ordre dans la section (détermine quelle page s'ouvre en premier) |
| `excerpt` | text | Courte description, affichée sous le titre |
| `image` | image | Image principale avec recadrage intelligent (hotspot) |
| `content` | Portable Text | Contenu riche : texte, titres, listes, images insérées |
| `externalUrl` | url | Si renseigné, le lien pointe vers un site externe (ex: formulaire Google) au lieu d'une page interne |

---

## 8. Structure du Studio (`src/sanity/structure.ts`)

```ts
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())
```

Génère automatiquement un item dans la barre latérale du Studio pour chaque type
de document (`Section`, `Page`). On peut personnaliser cette structure plus tard
pour par exemple grouper les pages par section.

---

## 9. Requêtes GROQ (`src/sanity/queries.ts`)

GROQ est le langage de requête de Sanity (similaire à SQL mais pour JSON).

### `PAGE_BY_SLUG_QUERY`
```groq
*[_type == "page" && slug.current == $slug && !defined(section)][0]{ ... }
```
Récupère une page de **premier niveau** (sans section) par son slug.
Utilisée par `/[slug]/page.tsx` pour des pages comme `/don`.

### `PAGE_BY_SECTION_AND_SLUG_QUERY`
```groq
*[_type == "page" && slug.current == $slug && section->slug.current == $section][0]{ ... }
```
Récupère une page dans une section précise.
La syntaxe `section->slug.current` suit la **référence** vers le document `section`
pour lire son slug.
Utilisée par `/[slug]/[subSlug]/page.tsx`.

### `FIRST_PAGE_OF_SECTION_QUERY`
```groq
*[_type == "page" && section->slug.current == $section] | order(order asc)[0]{ ... }
```
Récupère la **première page** d'une section (selon le champ `order`).
Utilisée par `/[slug]/page.tsx` pour rediriger `/sacrements` → `/sacrements/bapteme-enfants`.

### `PAGES_BY_SECTION_QUERY`
```groq
*[_type == "page" && section->slug.current == $section] | order(order asc){ ... }
```
Récupère **toutes les pages** d'une section dans l'ordre. Utile pour afficher
une liste de sous-pages.

---

## 10. Routing Next.js

| URL | Fichier | Ce qu'il fait |
|---|---|---|
| `/studio` | `src/app/studio/[[...tool]]/page.tsx` | Interface d'administration Sanity |
| `/don` | `src/app/[slug]/page.tsx` | Page de premier niveau (pas de section) |
| `/sacrements` | `src/app/[slug]/page.tsx` | Redirige vers la 1ère page de la section |
| `/sacrements/bapteme-enfants` | `src/app/[slug]/[subSlug]/page.tsx` | Page de contenu dans une section |

### Logique de `/[slug]/page.tsx`
1. Cherche si `slug` correspond à une **section** → redirige vers sa 1ère page
2. Sinon cherche une **page de premier niveau** avec ce slug
3. Si rien trouvé → page 404

---

## 11. Commandes utiles

```bash
# Lancer le Studio en développement (intégré dans pnpm dev)
pnpm dev
# → Studio accessible sur http://localhost:3000/studio

# Déployer le Studio en production sur Sanity hosting
pnpm sanity deploy

# Déployer les schémas (permet aux outils MCP de voir les nouveaux types)
pnpm sanity schema deploy

# Ouvrir le dashboard Sanity en ligne
pnpm sanity manage
```

---

## 12. Ajouter du contenu — étapes

### Créer une section (ex : "Sacrements")
1. Aller sur `/studio`
2. Cliquer sur **Section** → **Créer**
3. Renseigner `Titre = Sacrements` → cliquer sur **Générer** pour le slug → `sacrements`
4. Renseigner `Ordre = 3` (ordre dans la liste du Studio)
5. **Publier**

### Créer une page (ex : "Baptême des enfants")
1. Cliquer sur **Page** → **Créer**
2. `Titre = Baptême des enfants`
3. Slug → **Générer** → `bapteme-enfants`
4. `Section parente` → sélectionner **Sacrements**
5. `Ordre = 1` (sera la première page de la section)
6. Rédiger le **Contenu** (éditeur riche)
7. **Publier**

→ La page est maintenant accessible sur `/sacrements/bapteme-enfants`
→ `/sacrements` redirige automatiquement vers cette page (car `order = 1`)

### Créer une page de premier niveau (ex : "Faire un don")
- Même procédure mais laisser **Section parente vide**
- Le slug `don` donnera l'URL `/don`

---

## 13. Arborescence des fichiers Sanity

```
sanity.config.ts                   ← Config principale du Studio
src/
└── sanity/
    ├── env.ts                     ← Variables (projectId, dataset, apiVersion)
    ├── queries.ts                 ← Requêtes GROQ réutilisables
    ├── structure.ts               ← Arborescence de la barre latérale du Studio
    ├── lib/
    │   ├── client.ts              ← Client pour les requêtes
    │   ├── image.ts               ← Utilitaire URL pour les images
    │   └── live.ts                ← Live Content API (prévisualisation temps réel)
    └── schemaTypes/
        ├── index.ts               ← Enregistrement des schémas
        ├── section.ts             ← Type "Section" (catégories de menu)
        └── page.ts                ← Type "Page" (pages de contenu)
```