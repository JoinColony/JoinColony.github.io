/* @flow */

import type { Store, StoreObject } from '~types';

export const getStore = (name: Store) => {
  const item = window.localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};

export const setStore = (name: Store, item: ?StoreObject) => {
  if (item) {
    window.localStorage.setItem(name, JSON.stringify(item));
  } else {
    window.localStorage.removeItem(name);
  }
};
