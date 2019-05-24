/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

export type Provider = 'github' | 'discourse';

export type Discourse = {|
  email: ?string,
  name: ?string,
  photo: ?string,
  username: string,
|};

export type GitHub = {|
  email: ?string,
  name: ?string,
  photo: string,
  username: string,
|};

export type Session = {|
  id: string,
|};

export type User = {|
  addresses: Array<string>,
  admin: boolean,
  colonies: ?{
    goerli: ?Array<string>,
    mainnet: ?Array<string>,
  },
  discourse: ?Discourse,
  email: ?string,
  github: GitHub,
  name: string,
  session: Session,
|};

export type Network = {|
  id: number,
  name: string,
  slug: string,
  color: string,
|};

export type Store = 'network' | 'user' | 'wallet';

export type StoreObject = Network | User | WalletObjectType;
