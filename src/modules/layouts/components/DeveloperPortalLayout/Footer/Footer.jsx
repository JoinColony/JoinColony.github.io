/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Link from '~core/Link';

import VerticalMenu from './VerticalMenu';

import styles from './Footer.module.css';

const MSG = defineMessages({
  linkVisitColony: {
    id: 'layouts.DeveloperPortalLayout.Footer.linkVisitColony',
    defaultMessage: 'Visit {domain}',
  },
  navTitleGetStarted: {
    id: 'layouts.DeveloperPortalLayout.Footer.navTitleGetStarted',
    defaultMessage: 'Get Started',
  },
  navLinkTutorials: {
    id: 'layouts.DeveloperPortalLayout.Footer.navLinkTutorials',
    defaultMessage: 'Tutorials',
  },
  navLinkSupport: {
    id: 'layouts.DeveloperPortalLayout.Footer.navLinkSupport',
    defaultMessage: 'Support',
  },
  navTitleCoreProducts: {
    id: 'layouts.DeveloperPortalLayout.Footer.navTitleCoreProducts',
    defaultMessage: 'Colony Core',
  },
  navTitleOpenSourceTools: {
    id: 'layouts.DeveloperPortalLayout.Footer.navTitleCoreProducts',
    defaultMessage: 'Colony Core',
  },
});

const displayName = 'layouts.DeveloperPortalLayout.Footer';

const Footer = () => (
  <div className={styles.main}>
    <div className={styles.footerContent}>
      <div className={styles.navRow}>
        <div className={styles.logoContainer}>
          <Link href="https://colony.io">
            {/* @TODO: logo here */}
            <FormattedMessage
              {...MSG.linkVisitColony}
              values={{ domain: 'colony.io' }}
            />
          </Link>
        </div>
        <div className={styles.navGroup}>
          <div className={styles.navGroupItem}>
            <VerticalMenu
              headingText={MSG.navTitleGetStarted}
              menuItems={[
                { href: '/tutorials', text: MSG.navLinkTutorials },
                { href: '/support', text: MSG.navLinkSupport },
              ]}
            />
          </div>
          <div className={styles.navGroupItem}>
            <VerticalMenu
              headingText={MSG.navTitleCoreProducts}
              menuItems={[
                // @TODO fix these links...
                { href: '/network', text: 'colonyNetwork' },
                { href: '/starter', text: 'colonyStarter' },
                { href: '/js', text: 'colonyJS' },
              ]}
            />
          </div>
          <div className={styles.navGroupItem}>
            <VerticalMenu
              numColumns={2}
              headingText={MSG.navTitleOpenSourceTools}
              menuItems={[
                // @TODO fix these links...
                { href: '/budgetbox', text: 'budgetBox' },
                { href: '/pinion', text: 'pinion' },
                { href: '/purser', text: 'purser' },
                { href: '/solidity-coverage', text: 'solidity-coverage' },
                { href: '/tailor', text: 'tailor' },
                { href: '/trufflepig', text: 'trufflepig' },
              ]}
            />
          </div>
        </div>
      </div>
      <div className={styles.metaRow}>
        <div className={styles.metaNavContainer}>
          {/* @TODO: nav items here */}
        </div>
        <div className={styles.iconContainer}>
          {/* @TODO: icon list here */}
        </div>
      </div>
    </div>
  </div>
);

Footer.displayName = displayName;

export default Footer;
