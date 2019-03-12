/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';

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
    <div className={styles.hero}>
      <div className={styles.logo}>
        <Image
          alt={MSG.heroTitle}
          src={withPrefix('/img/devPortal/logomark_colonyJS.svg')}
        />
      </div>
      <div className={styles.cta}>
        <Heading
          appearance={{ margin: 'small', size: 'tiny', weight: 'thin' }}
          text={MSG.heroSubTitle}
        />
        <Heading
          appearance={{ margin: 'none', size: 'normal', weight: 'thin' }}
          text={MSG.heroTitle}
        />
      </div>
    </div>
    <div className={styles.content}>{/* Menu items here */}</div>
  </div>
);

DocsDropdown.displayName = displayName;

export default DocsDropdown;
