/* @flow */

import React from 'react';

import WebsiteLayout from '~layouts/WebsiteLayout';

import Hero from './Hero';

const displayName = 'pages.Website.About';

const About = () => (
  <WebsiteLayout transparentNav>
    <Hero />
  </WebsiteLayout>
);

About.displayName = displayName;

export default About;
