/* @flow */

import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { defineMessages } from 'react-intl';

import Icon from '~core/Icon';
import Link from '~core/Link';
import { getMainClasses } from '~utils/css';
import { PAGE_INDEX } from '~routes';

import type { Appearance, Props } from './types';

import ThemeContext from '../context';

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

const displayName = 'layouts.WebsiteLayout.Header';

const Header = ({ appearance: appearanceProp, showOnScrollHeight }: Props) => {
  const [showScrolledNav, setShowScrolledNav] = useState(false);
  const { headerHeight } = useContext(ThemeContext);

  const isShowOnScrollEnabled = typeof showOnScrollHeight !== 'undefined';

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      const scrollTop = window.scrollTop || window.pageYOffset;
      const shouldShow =
        isShowOnScrollEnabled &&
        scrollTop > headerHeight && // make sure we've scrolled past the regular top nav. Useful for responsiveness.
        scrollTop > showOnScrollHeight;
      if (shouldShow && !showScrolledNav) {
        setShowScrolledNav(true);
      }
      if (!shouldShow && showScrolledNav) {
        setShowScrolledNav(false);
      }
    }
  }, [
    headerHeight,
    isShowOnScrollEnabled,
    showOnScrollHeight,
    showScrolledNav,
  ]);

  useLayoutEffect(() => {
    // Incase page is loaded at a scrolled position
    if (isShowOnScrollEnabled) {
      handleScroll();
    }
  }, [handleScroll, isShowOnScrollEnabled, showOnScrollHeight]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isShowOnScrollEnabled) {
        window.addEventListener('scroll', handleScroll);
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll, isShowOnScrollEnabled, showOnScrollHeight]);

  const appearance = showScrolledNav
    ? ({ logoTheme: 'dark', theme: 'scrolled' }: Appearance)
    : appearanceProp;

  const logoName =
    appearance && appearance.logoTheme === 'dark'
      ? 'colony_logo_horizontal_navy'
      : 'colony_logo_horizontal_white';

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
