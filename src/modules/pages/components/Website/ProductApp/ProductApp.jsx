/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';
import TokenSupport from '~parts/TokenSupport';

import Hero from './Hero';
import Hub from './Hub';
import Roadmap from './Roadmap';

const displayName = 'pages.Website.ProductApp';

const ProductApp = () => (
  <WebsiteLayout
    headerAppearance={{
      logoTheme: 'light',
      navTheme: 'dark',
      theme: 'transparent',
    }}
  >
    <Hero />
    <Hub />
    <TokenSupport />
    <Roadmap />
  </WebsiteLayout>
);

ProductApp.displayName = displayName;

export default ProductApp;
