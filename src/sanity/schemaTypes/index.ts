import { type SchemaTypeDefinition } from "sanity";
import { sectionType } from "./section";
import { pageType } from "./page";
import { calloutType } from './callout'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sectionType, pageType, calloutType],
};