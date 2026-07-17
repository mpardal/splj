import { defineField, defineType } from "sanity";

const CATEGORIES = [
  { title: "Messe & Liturgie", value: "Messe & Liturgie" },
  { title: "Pèlerinage", value: "Pèlerinage" },
  { title: "Formation", value: "Formation" },
  { title: "Rencontre & Convivialité", value: "Rencontre & Convivialité" },
  { title: "Concert & Musique", value: "Concert & Musique" },
  { title: "Jeunesse", value: "Jeunesse" },
  { title: "Retraite", value: "Retraite" },
  { title: "Autre", value: "Autre" },
];

export const evenementType = defineType({
  name: "evenement",
  title: "Événement",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "titre" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: { list: CATEGORIES },
    }),
    defineField({
      name: "dateDebut",
      title: "Date de début",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heureDebut",
      title: "Heure de début",
      type: "string",
      description: 'Ex : "10h30", "18h00"',
    }),
    defineField({
      name: "dateFin",
      title: "Date de fin",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      description: "Laisser vide si l'événement se déroule sur une seule journée",
    }),
    defineField({
      name: "heureFin",
      title: "Heure de fin",
      type: "string",
      description: 'Ex : "12h00"',
    }),
    defineField({
      name: "lieu",
      title: "Lieu",
      type: "string",
      description: 'Ex : "Église Saint Pierre-Le-Jeune", "Salle paroissiale"',
    }),
    defineField({
      name: "description",
      title: "Résumé",
      type: "text",
      rows: 3,
      description: "Courte description affichée dans la liste",
    }),
    defineField({
      name: "contenu",
      title: "Contenu détaillé",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Texte alternatif", type: "string" }),
          ],
        },
        { type: "callout" },
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "lienInscription",
      title: "Lien d'inscription",
      type: "url",
      description: "URL vers un formulaire ou une page d'inscription externe",
    }),
    defineField({
      name: "annule",
      title: "Événement annulé",
      type: "boolean",
      initialValue: false,
      description: "Cocher pour afficher l'événement comme annulé",
    }),
  ],
  orderings: [
    {
      title: "Date (plus proche en premier)",
      name: "dateAsc",
      by: [{ field: "dateDebut", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "titre",
      date: "dateDebut",
      lieu: "lieu",
      annule: "annule",
      media: "image",
    },
    prepare({ title, date, lieu, annule, media }) {
      const subtitle = [date, lieu].filter(Boolean).join(" · ");
      return {
        title: annule ? `⚠ ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
