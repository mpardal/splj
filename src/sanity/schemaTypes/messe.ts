import { defineField, defineType } from "sanity";

const JOURS = [
  { title: "Lundi", value: "Lundi" },
  { title: "Mardi", value: "Mardi" },
  { title: "Mercredi", value: "Mercredi" },
  { title: "Jeudi", value: "Jeudi" },
  { title: "Vendredi", value: "Vendredi" },
  { title: "Samedi", value: "Samedi" },
  { title: "Dimanche", value: "Dimanche" },
];

const JOUR_ORDER: Record<string, number> = {
  Lundi: 1, Mardi: 2, Mercredi: 3, Jeudi: 4,
  Vendredi: 5, Samedi: 6, Dimanche: 7,
};

export const messeType = defineType({
  name: "messe",
  title: "Horaire de messe",
  type: "document",
  fields: [
    defineField({
      name: "jour",
      title: "Jour",
      type: "string",
      options: { list: JOURS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heure",
      title: "Heure",
      type: "string",
      description: 'Format : "18h30", "10h30"…',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      title: "Intitulé",
      type: "string",
      description: 'Ex : "Messe du soir", "Messe dominicale"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "actif",
      title: "Actif",
      type: "boolean",
      initialValue: true,
      description: "Décocher pour masquer temporairement cet horaire",
    }),
    defineField({
      name: "note",
      title: "Note exceptionnelle",
      type: "string",
      description: 'Ex : "Uniquement en juillet–août", "Suspendu en août"',
    }),
    defineField({
      name: "ordre",
      title: "Ordre d'affichage",
      type: "number",
      description: "Laisser vide : tri automatique par jour de semaine",
    }),
  ],
  orderings: [
    {
      title: "Jour de la semaine",
      name: "jourAsc",
      by: [{ field: "ordre", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      jour: "jour",
      heure: "heure",
      label: "label",
      actif: "actif",
      note: "note",
    },
    prepare({ jour, heure, label, actif, note }) {
      return {
        title: `${jour} ${heure} — ${label}`,
        subtitle: [!actif && "⏸ Désactivé", note].filter(Boolean).join(" · "),
        media: () => (actif ? "🕊" : "⏸"),
      };
    },
  },
  __experimental_formPreviewTitle: false,
});

export { JOUR_ORDER };