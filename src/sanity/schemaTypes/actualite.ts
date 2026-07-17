import { defineField, defineType } from "sanity";

const CATEGORIES = [
  { title: "Vie paroissiale", value: "Vie paroissiale" },
  { title: "Sacrements", value: "Sacrements" },
  { title: "Communauté", value: "Communauté" },
  { title: "Agenda", value: "Agenda" },
  { title: "Annonce", value: "Annonce" },
  { title: "Formation", value: "Formation" },
];

export const actualiteType = defineType({
  name: "actualite",
  title: "Actualité",
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
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resume",
      title: "Résumé",
      type: "text",
      rows: 3,
      description: "Court résumé affiché sur la homepage et la liste des actualités",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "contenu",
      title: "Contenu",
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
  ],
  orderings: [
    {
      title: "Date (plus récent en premier)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "titre",
      subtitle: "categorie",
      date: "date",
      media: "image",
    },
    prepare({ title, subtitle, date, media }) {
      return {
        title,
        subtitle: [subtitle, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
