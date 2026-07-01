import { defineQuery } from "next-sanity";

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
    excerpt
  }
`);