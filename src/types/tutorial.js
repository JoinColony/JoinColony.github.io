/* @flow */
import type { HtmlAst } from '~types';

export type TutorialFrontmatter = {|
  author: string,
  exampleUrl?: string,
  exampleLinkText?: string,
  order: number,
  publishDate: string,
  title: string,
|};

export type Tutorial = {|
  editUrl: string,
  excerpt: string,
  frontmatter: TutorialFrontmatter,
  htmlAst: HtmlAst,
  name: string,
  slug: string,
|};

export type TutorialNode = {|
  name: string,
  fields: {
    slug: string,
  },
|};
