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
  frontmatter: TutorialFrontmatter,
  name: string,
  slug: string,
  htmlAst: HtmlAst,
|};

export type TutorialNode = {|
  name: string,
  fields: {
    slug: string,
  },
|};
