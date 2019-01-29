/* @flow */

import type { Doc } from './doc';

export type SectionDoc = Doc & {
  frontmatter: {
    title: string,
    order: number,
  },
  slug: string,
};

export type Section = {
  name: string,
  slug: string,
  docs: Array<SectionDoc>,
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
