/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';
import TokenSupport from '~parts/TokenSupport';

import Hero from './Hero';
import Hub from './Hub';

const displayName = 'pages.Website.ProductDapp';

const ProductDapp = () => (
  <WebsiteLayout headerAppearance={{ navTheme: 'dark', theme: 'transparent' }}>
    <Hero />
    <Hub />
    <TokenSupport />
  </WebsiteLayout>
);

ProductDapp.displayName = displayName;

export default ProductDapp;
