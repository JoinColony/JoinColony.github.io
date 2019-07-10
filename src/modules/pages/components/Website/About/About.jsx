/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import FirmToFluid from './FirmToFluid';
import Hero from './Hero';

const displayName = 'pages.Website.About';

const About = () => (
  <WebsiteLayout transparentNav>
    <Hero />
    <FirmToFluid />
  </WebsiteLayout>
);

About.displayName = displayName;

export default About;
