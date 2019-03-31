/* @flow */
import type { HtmlAst } from '~types';

export type TutorialFrontmatter = {|
  author: string,
  exampleUrl?: string,
  exampleLinkText?: string,
  publishDate: Date,
  title: string,
|};

export type Tutorial = {|
  frontmatter: TutorialFrontmatter,
  name: string,
  slug: string,
  htmlAst: HtmlAst,
|};
