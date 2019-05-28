/* @flow */

import type { StoreObject } from '~types';

export const getStore = (name: string) => {
  const item = window.localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};

export const setStore = (name: string, item: ?StoreObject) => {
  if (item) {
    window.localStorage.setItem(name, JSON.stringify(item));
  } else {
    window.localStorage.removeItem(name);
  }
};
