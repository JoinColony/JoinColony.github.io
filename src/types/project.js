/* @flow */

import type { Doc } from './doc';

export type Section = {
  name: string,
  slug: string,
  docs: Array<Doc>,
};

export type Project = {
  description: string,
  entryPoint: string,
  logo: string,
  logoSmall: string,
  name: string,
  sectionOrder: Array<string>,
  sections: Array<Section>,
  slug: string,
};
