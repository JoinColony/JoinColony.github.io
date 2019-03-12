/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import styles from './DocsDropdown.module.css';

const MSG = defineMessages({
  heroTitle: {
    id: 'layouts.DeveloperPortalLayout.DocsDropdown.heroTitle',
    defaultMessage: 'Start building with Colony',
  },
  heroSubTitle: {
    id: 'layouts.DeveloperPortalLayout.DocsDropdown.heroSubTitle',
    defaultMessage: 'Get started',
  },
  headingCoreProducts: {
    id: 'layouts.DeveloperPortalLayout.DocsDropdown.headingCoreProducts',
    defaultMessage: 'Colony Core',
  },
  headingOpenSourceProducts: {
    id: 'layouts.DeveloperPortalLayout.DocsDropdown.headingOpenSourceProducts',
    defaultMessage: 'Open Source Tools',
  },
});

const displayName = 'layouts.DeveloperPortalLayout.DocsDropdown';

const DocsDropdown = () => (
  <div className={styles.main}>
    <div className={styles.hero}>{/* Hero here */}</div>
    <div className={styles.content}>{/* Menu items here */}</div>
  </div>
);

DocsDropdown.displayName = displayName;

export default DocsDropdown;
