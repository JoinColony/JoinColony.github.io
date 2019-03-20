/* @flow */
import React from 'react';

import DeveloperPortalLayout from '~layouts/DeveloperPortalLayout';

import CoreProducts from './CoreProducts';
import Hero from './Hero';

import styles from './Developers.module.css';

const displayName = 'pages.Developers';

const Developers = () => (
  <DeveloperPortalLayout>
    <main className={styles.main}>
      <Hero />
      <CoreProducts />
      <div className={styles.openSourceProductsContainer} />
      <div className={styles.supportCta} />
    </main>
  </DeveloperPortalLayout>
);

Developers.displayName = displayName;

export default Developers;
