/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import Hero from './Hero';

const displayName = 'pages.Website.HomePage';

const HomePage = () => (
  <WebsiteLayout transparentNav>
    <Hero />
  </WebsiteLayout>
);

HomePage.displayName = displayName;

export default HomePage;
