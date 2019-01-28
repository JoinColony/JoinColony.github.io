/* @flow */

export type SectionDoc = {
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
  logo: string,
  name: string,
  sectionOrder: Array<string>,
  sections: Array<Section>,
  slug: string,
};
