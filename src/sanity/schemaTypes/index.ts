import { type SchemaTypeDefinition } from "sanity";
import { sectionType } from "./section";
import { pageType } from "./page";
import { calloutType } from './callout'
import { messeType } from './messe'
import { actualiteType } from './actualite'
import { evenementType } from './evenement'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sectionType, pageType, calloutType, messeType, actualiteType, evenementType],
};