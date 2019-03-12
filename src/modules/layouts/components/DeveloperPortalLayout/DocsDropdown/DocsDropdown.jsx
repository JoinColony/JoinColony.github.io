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
    {/* @TODO: fix url */}
    <Link className={styles.heroLink} href="/">
      <div className={styles.hero}>
        <div className={styles.logoContainer}>
          <Image
            alt={MSG.heroTitle}
            className={styles.logo}
            src={withPrefix('/img/devPortal/logomark_colonyJS.svg')}
          />
        </div>
        <div className={styles.cta}>
          <Heading
            appearance={{
              margin: 'small',
              size: 'small',
              theme: 'light',
              weight: 'thin',
            }}
            text={MSG.heroSubTitle}
          />
          <Heading
            appearance={{
              margin: 'tiny',
              size: 'medium',
              theme: 'dark',
              weight: 'thin',
            }}
            text={MSG.heroTitle}
          />
        </div>
      </div>
    </Link>
    <div className={styles.content}>{/* Menu items here */}</div>
  </div>
);

DocsDropdown.displayName = displayName;

export default DocsDropdown;
