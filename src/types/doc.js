/* @flow */

import type { HtmlAst } from '~types/htmlAst';

export type DocFields = {|
  locale: string,
  slug: string,
|};

export type Doc = {|
  editUrl: string,
  fields: DocFields,
  frontmatter: Object,
  htmlAst: HtmlAst,
  slug: string,
|};
