/* @flow */

export type HtmlAst = {|
  children?: Array<HtmlAst>,
  data?: {
    quirksMode: boolean,
  },
  properties?: Object,
  tagName?: string,
  type: string,
  value?: string,
|};
