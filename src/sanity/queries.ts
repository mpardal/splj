import { defineQuery } from "next-sanity";

export const ACTUALITES_HOMEPAGE_QUERY = defineQuery(`
  *[_type == "actualite"] | order(date desc)[0...5] {
    _id,
    titre,
    "slug": slug.current,
    categorie,
    date,
    resume,
    image
  }
`);

export const ACTUALITES_ALL_QUERY = defineQuery(`
  *[_type == "actualite"] | order(date desc) {
    _id,
    titre,
    "slug": slug.current,
    categorie,
    date,
    resume,
    image
  }
`);

export const ACTUALITE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "actualite" && slug.current == $slug][0] {
    _id,
    titre,
    "slug": slug.current,
    categorie,
    date,
    resume,
    image,
    contenu
  }
`);

export const AGENDA_QUERY = defineQuery(`
  *[_type == "evenement" && dateDebut >= $today] | order(dateDebut asc) {
    _id,
    titre,
    "slug": slug.current,
    categorie,
    dateDebut,
    heureDebut,
    dateFin,
    heureFin,
    lieu,
    description,
    lienInscription,
    annule
  }
`);

export const EVENEMENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "evenement" && slug.current == $slug][0] {
    _id,
    titre,
    "slug": slug.current,
    categorie,
    dateDebut,
    heureDebut,
    dateFin,
    heureFin,
    lieu,
    description,
    contenu,
    image,
    lienInscription,
    annule
  }
`);

export const MESSES_QUERY = defineQuery(`
  *[_type == "messe" && actif == true] | order(coalesce(ordre, 99) asc, jour asc, heure asc) {
    _id,
    jour,
    heure,
    label,
    note
  }
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug && !defined(section)][0]{
    _id,
    title,
    slug,
    excerpt,
    image,
    content,
    externalUrl
  }
`);

export const PAGE_BY_SECTION_AND_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug && section->slug.current == $section][0]{
    _id,
    title,
    slug,
    excerpt,
    image,
    content,
    externalUrl,
    "sectionTitle": section->title,
    "sectionSlug": section->slug.current
  }
`);

export const FIRST_PAGE_OF_SECTION_QUERY = defineQuery(`
  *[_type == "page" && section->slug.current == $section] | order(order asc)[0]{
    _id,
    slug,
    externalUrl
  }
`);

export const PAGES_BY_SECTION_QUERY = defineQuery(`
  *[_type == "page" && section->slug.current == $section] | order(order asc){
    _id,
    title,
    slug,
    excerpt,
    externalUrl
  }
`);