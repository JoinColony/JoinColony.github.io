/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Link from '~core/Link';
import { PAGE_PRIVACY_POLICY, PAGE_TERMS_SERVICE } from '~routes';

import styles from './MetaNav.module.css';

const MSG = defineMessages({
  metaLinkTos: {
    id: 'layouts.DeveloperPortalLayout.Footer.metaLinkTos',
    defaultMessage: 'Terms & Service',
  },
  metaLinkPrivacy: {
    id: 'layouts.DeveloperPortalLayout.Footer.metaLinkPrivacy',
    defaultMessage: 'Privacy Policy',
  },
});

const displayName = 'parts.MetaNav';

const MetaNav = () => (
  <div className={styles.main}>
    <nav className={styles.metaNav}>
      <Link
        href={PAGE_TERMS_SERVICE}
        className={styles.metaNavLink}
        text={MSG.metaLinkTos}
      />
      <Link
        href={PAGE_PRIVACY_POLICY}
        className={styles.metaNavLink}
        text={MSG.metaLinkPrivacy}
      />
    </nav>
  </div>
);

MetaNav.displayName = displayName;

export default MetaNav;
