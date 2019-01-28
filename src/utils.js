/* @flow */

type Doc = {
  frontmatter: {
    order: number,
  },
};
type Section = {
  docs: Array<Doc>,
  slug: string,
};

export const orderDocs = (a: Doc, b: Doc): number =>
  a.frontmatter.order - b.frontmatter.order;

export const orderSections = (
  sectionOrder: Array<string>,
  a: Section,
  b: Section,
): number =>
  sectionOrder
    ? sectionOrder.indexOf(a.slug) - sectionOrder.indexOf(b.slug)
    : 0;
