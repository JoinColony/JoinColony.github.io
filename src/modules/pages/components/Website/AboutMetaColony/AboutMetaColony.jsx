/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import CLNY from './CLNY';
import Econ from './Econ';
import Hero from './Hero';

const displayName = 'pages.Website.AboutMetaColony';

const AboutMetaColony = () => (
  <WebsiteLayout headerAppearance={{ navTheme: 'dark', theme: 'transparent' }}>
    <Hero />
    <Econ />
    <CLNY />
  </WebsiteLayout>
);

AboutMetaColony.displayName = displayName;

export default AboutMetaColony;
