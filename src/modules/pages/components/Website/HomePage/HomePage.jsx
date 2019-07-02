/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import EtherBanner from './EtherBanner';
import Hero from './Hero';
import Products from './Products';
import TLDR from './TLDR';
import Toolkit from './Toolkit';
import Vision from './Vision';

const displayName = 'pages.Website.HomePage';

const HomePage = () => (
  <WebsiteLayout transparentNav>
    <Hero />
    <TLDR />
    <Products />
    <Toolkit />
    <Vision />
    <EtherBanner />
  </WebsiteLayout>
);

HomePage.displayName = displayName;

export default HomePage;
