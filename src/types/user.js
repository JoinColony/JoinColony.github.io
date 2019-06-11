/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

export type Provider = 'github' | 'discourse';

export type Contribution = {|
  issue: ?string,
  operations: Array<string>,
  payout: number,
  pullRequest: ?string,
  type: string,
  typeId: number,
  username: string,
|};

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

export type Colony = {|
  colonyAddress: string,
  colonyLabel: string,
  tokenAddress: string,
|};

export type Issue = {|
  node: {
    createdAt: string,
    title: string,
    url: string,
  },
|};

export type StoreObject =
  | Contribution
  | Colony
  | Network
  | User
  | WalletObjectType;
