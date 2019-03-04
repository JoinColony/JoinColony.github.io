/* @flow */

export type Site = {|
  site: {
    siteMetadata: {
      languages: {
        defaultLangKey: string,
        langs: Array<string>,
        prefixDefaultLangKey: boolean,
      },
    },
  },
|};
