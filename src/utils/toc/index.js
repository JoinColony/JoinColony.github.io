/* @flow */

// Because: https://github.com/gatsbyjs/gatsby/issues/8982
// eslint-disable-next-line import/prefer-default-export
export const fixTocCodeTag = (tocLinks?: string): string => {
  if (!tocLinks) return '';

  const lessThanSignRegex = /&#x3C;/gi;

  return tocLinks.replace(lessThanSignRegex, '<');
};
