/* @flow */

import type { Element } from 'react';

import React, { Component } from 'react';

type Props = {|
  children: Element<typeof Component>,
|};

const displayName = 'layouts.WebsiteLayout';

const WebsiteLayout = ({ children }: Props) => <>{children}</>;

WebsiteLayout.displayName = displayName;

export default WebsiteLayout;
