/* @flow */

export type Provider = 'github' | 'discourse';

export type UserItem = 'github' | 'discourse' | 'wallet';

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
