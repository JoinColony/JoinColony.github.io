/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Icon from '~core/Icon';
import Link from '~core/Link';
import { getMainClasses } from '~utils/css';
import { PAGE_INDEX } from '~routes';

import styles from './Header.module.css';

const MSG = defineMessages({
  navLinkProducts: {
    id: 'layouts.WebsiteLayout.Header.navLinkProducts',
    defaultMessage: 'Products',
  },
  navLinkDevelopers: {
    id: 'layouts.WebsiteLayout.Header.navLinkDevelopers',
    defaultMessage: 'Developers',
  },
  navLinkAbout: {
    id: 'layouts.WebsiteLayout.Header.navLinkAbout',
    defaultMessage: 'About',
  },
  navLinkEarlyAccess: {
    id: 'layouts.WebsiteLayout.Header.navLinkEarlyAccess',
    defaultMessage: 'Get early access',
  },
});

type Appearance = {|
  theme?: 'light' | 'transparent',
|};

type Props = {|
  appearance?: Appearance,
|};

const displayName = 'layouts.WebsiteLayout.Header';

const Header = ({ appearance }: Props) => {
  const logoName =
    appearance && appearance.theme === 'transparent'
      ? 'colony_logo_horizontal_white'
      : 'colony_logo_horizontal_navy';
  return (
    <div className={getMainClasses(appearance, styles)}>
      <div className={styles.navigationContainer}>
        <div>
          <Link href={PAGE_INDEX}>
            <Icon
              className={styles.logo}
              name={logoName}
              title="Colony"
              viewBox="0 0 134 33"
            />
          </Link>
        </div>
        <div>
          <nav>
            <Link
              activeClassName={styles.active}
              className={styles.navLink}
              // @TODO: use appropriate route
              href="/"
              text={MSG.navLinkProducts}
            />
            <Link
              activeClassName={styles.active}
              className={styles.navLink}
              // @TODO: use appropriate route
              href="/"
              text={MSG.navLinkDevelopers}
            />
            <Link
              activeClassName={styles.active}
              className={styles.navLink}
              // @TODO: use appropriate route
              href="/"
              text={MSG.navLinkAbout}
            />
            <Link
              activeClassName={styles.active}
              className={styles.navLinkAlt}
              // @TODO: use appropriate route
              href="/"
              text={MSG.navLinkEarlyAccess}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

Header.displayName = displayName;

export default Header;
