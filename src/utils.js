/* @flow */

import type { Doc, Section } from './types';

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
