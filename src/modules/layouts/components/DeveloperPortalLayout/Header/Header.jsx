/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Link from '~core/Link';

import styles from './Header.module.css';

const MSG = defineMessages({
  navLinkDocs: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkDocs',
    defaultMessage: 'Docs',
  },
  navLinkTutorials: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkTutorials',
    defaultMessage: 'Tutorials',
  },
  navLinkSupport: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkSupport',
    defaultMessage: 'Support',
  },
});

const displayName = 'layouts.DeveloperPortalLayout.Header';

const Header = () => (
  <div className={styles.main}>
    <div className={styles.logo}>{/* @TODO: developer portal logo here */}</div>
    <div className={styles.navContainer}>
      <nav className={styles.navigation}>
        <Link className={styles.navLink} href="/docs">
          <FormattedMessage {...MSG.navLinkDocs} />
          {/* @TODO: dropdown nav here */}
        </Link>
        <Link className={styles.navLink} href="/tutorials">
          <FormattedMessage {...MSG.navLinkTutorials} />
          {/* @TODO: dropdown nav here */}
        </Link>
        <Link
          className={styles.navLink}
          href="/support"
          linkText={MSG.navLinkSupport}
        />
      </nav>
    </div>
  </div>
);

Header.displayName = displayName;

export default Header;
