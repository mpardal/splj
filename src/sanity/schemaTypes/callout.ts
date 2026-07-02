import { defineField, defineType } from "sanity";

export const calloutType = defineType({
    name: 'callout',
    title: 'Encadré',
    type: 'object',   // ← "object" et non "document" car c'est un bloc inline
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Titre'
        }),
        defineField({
            name: 'body',
            type: 'array',
            of: [{ type: 'block' }],
            title: 'Contenu'
        }),
    ]
});