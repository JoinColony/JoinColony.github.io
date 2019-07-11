/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import Ambition from './Ambition';
import Boundaries from './Boundaries';
import FirmToFluid from './FirmToFluid';
import Hero from './Hero';

const displayName = 'pages.Website.About';

const About = () => (
  <WebsiteLayout transparentNav>
    <Hero />
    <FirmToFluid />
    <Boundaries />
    <Ambition />
  </WebsiteLayout>
);

About.displayName = displayName;

export default About;
