/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import Hero from './Hero';

const displayName = 'pages.Website.AboutMetaColony';

const AboutMetaColony = () => (
  <WebsiteLayout headerAppearance={{ navTheme: 'dark', theme: 'transparent' }}>
    <Hero />
  </WebsiteLayout>
);

AboutMetaColony.displayName = displayName;

export default AboutMetaColony;
