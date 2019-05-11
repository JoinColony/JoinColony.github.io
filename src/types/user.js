/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

export type Provider = 'github' | 'discourse';

export type Email = {|
  email: string,
|};

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

export type Store = 'email' | 'discourse' | 'github' | 'network' | 'wallet';

export type StoreObject =
  | Email
  | Discourse
  | GitHub
  | Network
  | WalletObjectType;
