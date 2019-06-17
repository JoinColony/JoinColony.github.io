/* @flow */
/* eslint-disable import/prefer-default-export */

import type { Network } from '~types';

export const supportedNetwork = (network: ?Network) => {
  return network && (network.id === 1 || network.id === 5);
};
