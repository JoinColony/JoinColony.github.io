/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import Hero from './Hero';
import Products from './Products';
import TLDR from './TLDR';

const displayName = 'pages.Website.HomePage';

const HomePage = () => (
  <WebsiteLayout transparentNav>
    <Hero />
    <TLDR />
    <Products />
  </WebsiteLayout>
);

HomePage.displayName = displayName;

export default HomePage;
