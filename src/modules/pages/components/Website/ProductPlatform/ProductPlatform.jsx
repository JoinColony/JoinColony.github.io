/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import Examples from './Examples';
import Hero from './Hero';
import LookGood from './LookGood';
import WithColony from './WithColony';

const displayName = 'pages.Website.ProductPlatform';

const ProductPlatform = () => (
  <WebsiteLayout headerAppearance={{ theme: 'transparent', logoTheme: 'dark' }}>
    <Hero />
    <LookGood />
    <Examples />
    <WithColony />
  </WebsiteLayout>
);

ProductPlatform.displayName = displayName;

export default ProductPlatform;
