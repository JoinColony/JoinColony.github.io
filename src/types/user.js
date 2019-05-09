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

export type Network = 'main' | 'ropsten' | 'kovan' | 'rinkeby' | 'private';

export type CachedItem = 'discourse' | 'github' | 'network' | 'wallet';

export type CachedItemObject = Discourse | GitHub | Network | WalletObjectType;
