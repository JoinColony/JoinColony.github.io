/* @flow */

import type { CachedItem, CachedItemObject } from '~types';

export const getCachedItem = (name: CachedItem) => {
  const item = window.localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};

export const setCachedItem = (name: CachedItem, item?: CachedItemObject) => {
  if (item) {
    window.localStorage.setItem(name, JSON.stringify(item));
  } else {
    window.localStorage.removeItem(name);
  }
};
