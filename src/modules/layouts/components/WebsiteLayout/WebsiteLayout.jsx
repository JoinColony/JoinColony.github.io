/* @flow */

import type { Element } from 'react';

import React, { Component } from 'react';

import Footer from './Footer';
import Header from './Header';

type Props = {|
  children: Element<typeof Component>,
|};

const displayName = 'layouts.WebsiteLayout';

const WebsiteLayout = ({ children }: Props) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

WebsiteLayout.displayName = displayName;

export default WebsiteLayout;
