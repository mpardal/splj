import { type SchemaTypeDefinition } from "sanity";
import { sectionType } from "./section";
import { pageType } from "./page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sectionType, pageType],
};