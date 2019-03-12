/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';
import VerticalMenu from '~core/VerticalMenu';

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
          <Icon
            className={styles.logo}
            name="logomark_colonyjs"
            title={MSG.heroTitle}
            viewBox="0 0 94.292442 94.068138"
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
    <div className={styles.menuContent}>
      <div className={styles.menuContainer}>
        <VerticalMenu
          headingAppearance={{ size: 'small', theme: 'light', weight: 'thin' }}
          headingText={MSG.headingCoreProducts}
          menuItems={[
            // @TODO fix these links...
            { href: '/network', text: 'colonyNetwork' },
            { href: '/js', text: 'colonyJS' },
            { href: '/starter', text: 'colonyStarter' },
          ]}
        />
      </div>
      <div className={styles.menuContainer}>
        <VerticalMenu
          headingAppearance={{ size: 'small', theme: 'light', weight: 'thin' }}
          headingText={MSG.headingOpenSourceProducts}
          menuItems={[
            // @TODO fix these links...
            { href: '/budgetbox', text: 'budgetBox' },
            { href: '/pinion', text: 'pinion' },
            { href: '/purser', text: 'purser' },
            { href: '/solidity-coverage', text: 'solidity-coverage' },
            { href: '/tailor', text: 'tailor' },
            { href: '/trufflepig', text: 'trufflepig' },
          ]}
          numColumns={2}
        />
      </div>
    </div>
  </div>
);

DocsDropdown.displayName = displayName;

export default DocsDropdown;
