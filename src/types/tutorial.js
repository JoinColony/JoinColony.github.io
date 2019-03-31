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
  frontmatter: TutorialFrontmatter,
  name: string,
  slug: string,
  htmlAst: HtmlAst,
|};
