/* @flow */
import type { Doc } from './doc';

type DescriptionTranslationConfig = {|
  locale: string,
  description: string,
|};

export type SectionTranslationConfig = {|
  locale: string,
  sectionOrder: Array<string>,
|};

export type Section = {|
  name: string,
  slug: string,
  docs: Array<Doc>,
|};

export type Project = {|
  description: string,
  descriptionTranslations?: Array<DescriptionTranslationConfig>,
  entryPoint: string,
  logo: string,
  logoSmall: string,
  name: string,
  repoUrl: string,
  sectionOrder: Array<string>,
  sections: Array<Section>,
  sectionTranslations?: Array<SectionTranslationConfig>,
  slug: string,
|};
