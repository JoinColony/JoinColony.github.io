/* @flow */
/* eslint-disable import/prefer-default-export */

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
