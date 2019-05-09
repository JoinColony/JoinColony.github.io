/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

export type Provider = 'github' | 'discourse';

export type Discourse = {|
  email?: string,
  name?: string,
  photo?: string,
  username: string,
|};

export type GitHub = {|
  email?: string,
  name?: string,
  photo: string,
  username: string,
|};

export type Network =
  | 'main'
  | 'ropsten'
  | 'kovan'
  | 'rinkeby'
  | 'goerli'
  | 'private'
  | null;

export type StoredItem = 'discourse' | 'github' | 'network' | 'wallet';

export type StoredItemObject = Discourse | GitHub | Network | WalletObjectType;
