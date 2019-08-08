/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import CLNY from './CLNY';
import Econ from './Econ';
import Hero from './Hero';
import Team from './Team';

const displayName = 'pages.Website.AboutMetaColony';

const AboutMetaColony = () => (
  <WebsiteLayout
    headerAppearance={{
      logoTheme: 'light',
      navTheme: 'dark',
      theme: 'transparent',
    }}
  >
    <Hero />
    <Econ />
    <CLNY />
    <Team />
  </WebsiteLayout>
);

AboutMetaColony.displayName = displayName;

export default AboutMetaColony;
