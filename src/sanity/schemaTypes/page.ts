import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "section",
      title: "Section parente",
      type: "reference",
      to: [{ type: "section" }],
      description: "Laisser vide pour une page de premier niveau (ex: /don)",
    }),
    defineField({
      name: "order",
      title: "Ordre dans la section",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "excerpt",
      title: "Résumé",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Contenu",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            }),
          ],
        },
        { type: 'callout' }
      ],
    }),
    defineField({
      name: "externalUrl",
      title: "Lien externe (remplace le contenu)",
      type: "url",
      description: "Si renseigné, le lien de menu pointera vers cette URL externe",
    }),
  ],
  orderings: [
    {
      title: "Ordre dans la section",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      sectionTitle: "section.title",
      slug: "slug.current",
    },
    prepare({ title, sectionTitle, slug }) {
      return {
        title,
        subtitle: sectionTitle ? `${sectionTitle} › ${slug}` : `/${slug}`,
      };
    },
  },
});