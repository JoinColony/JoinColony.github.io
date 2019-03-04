/* @flow */
import type { Node } from 'react';
import type { IntlShape, MessageDescriptor } from 'react-intl';

/**
 * Capitalize a word (converts the first letter of the word to upper case)
 *
 * @method capitalize
 *
 * @param {string} word The word / string to capitalize
 * @return {string} The capitalized string
 */
export const capitalize = (word: string): string =>
  word && word.charAt(0).toUpperCase() + word.slice(1);

export const getChildrenOrText = (
  children?: Node,
  text?: MessageDescriptor | string,
  textValues?: Object,
  { formatMessage }: IntlShape,
): Node | string => {
  if (children) {
    return children;
  }
  if (!text) {
    return '';
  }
  if (typeof text == 'string') {
    return text;
  }
  return formatMessage(text, textValues);
};

export const normalizePathname = (preNormalizedPathname: string): string =>
  preNormalizedPathname.endsWith('/') || preNormalizedPathname.endsWith('.html')
    ? preNormalizedPathname
    : `${preNormalizedPathname}/`;
