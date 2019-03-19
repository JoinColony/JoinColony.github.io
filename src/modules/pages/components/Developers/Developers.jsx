/* @flow */
import React from 'react';

import DeveloperPortalLayout from '~layouts/DeveloperPortalLayout';

import styles from './Developers.module.css';

const displayName = 'pages.Developers';

const Developers = () => (
  <DeveloperPortalLayout>
    <main className={styles.main}>
      <div className={styles.heroContainer} />
      <div className={styles.coreProductsContainer} />
      <div className={styles.openSourceProductsContainer} />
      <div className={styles.supportCta} />
    </main>
  </DeveloperPortalLayout>
);

Developers.displayName = displayName;

export default Developers;
