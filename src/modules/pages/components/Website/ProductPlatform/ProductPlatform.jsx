/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import Examples from './Examples';
import Hero from './Hero';
import LookGood from './LookGood';

const displayName = 'pages.Website.ProductPlatform';

const ProductPlatform = () => (
  <WebsiteLayout headerAppearance={{ theme: 'transparent', logoTheme: 'dark' }}>
    <Hero />
    <LookGood />
    <Examples />
  </WebsiteLayout>
);

ProductPlatform.displayName = displayName;

export default ProductPlatform;
