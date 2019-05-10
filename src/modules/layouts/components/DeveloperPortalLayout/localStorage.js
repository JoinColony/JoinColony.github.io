/* @flow */

import type { StoredItem, StoredItemObject } from '~types';

export const getStore = (name: StoredItem) => {
  const item = window.localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};

export const setStore = (name: StoredItem, item: ?StoredItemObject) => {
  if (item) {
    window.localStorage.setItem(name, JSON.stringify(item));
  } else {
    window.localStorage.removeItem(name);
  }
};
