/* @flow */

import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { withPrefix } from 'gatsby';

import Button from '~core/Button';
import Icon from '~core/Icon';
import Link from '~core/Link';
import NavigationToggle from '~core/NavigationToggle';
import { getMainClasses } from '~utils/css';
import {
  COLONY_DISCORD,
  DOCS_COLONYJS,
  PAGE_ABOUT_COLONY_NETWORK,
  PAGE_ABOUT_VISION,
  PAGE_ABOUT_METACOLONY,
  PAGE_ANCHOR_NEWSLETTER,
  PAGE_INDEX,
  PAGE_PRODUCT_APP,
  PAGE_PRODUCT_PLATFORM,
} from '~routes';

import type { Appearance, Props } from './types';

import ThemeContext from '../context';

import NavDropdownParent from './NavDropdownParent.jsx';

import styles from './Header.module.css';

const MSG = defineMessages({
  navAriaLabel: {
    id: 'layouts.WebsiteLayout.Header.navAriaLabel',
    defaultMessage: 'Main Navigation',
  },
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
  navLinkBetaColony: {
    id: 'layouts.WebsiteLayout.Header.navLinkBetaColony',
    defaultMessage: 'Go to the Betacolony',
  },
  navLinkCommunity: {
    id: 'layouts.WebsiteLayout.Header.navLinkCommunity',
    defaultMessage: 'Community',
  },
  navLinkNewsletter: {
    id: 'layouts.WebsiteLayout.Header.navLinkNewsletter',
    defaultMessage: 'Newsletter',
  },
  dropdownLinkBodyAboutColonyNetwork: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyAboutColonyNetwork',
    defaultMessage: `All about the features, how Colony works, and the
      technology it's built on.`,
  },
  dropdownLinkBodyAboutMetacolony: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyAboutMetacolony',
    defaultMessage: `All about the Colony colony: the economics, its
      token — CLNY, and how you can contribute.`,
  },
  dropdownLinkBodyAboutVision: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyAboutVision',
    defaultMessage: `Read about Colony's vision for the future of the firm. It
      get's weird.`,
  },
  dropdownLinkBodyDevDiscord: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyDevDiscord',
    defaultMessage: `Come and join the community on Discord. Discuss projects,
      technical questions, and more.`,
  },
  dropdownLinkBodyDevGetStarted: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyDevGetStarted',
    defaultMessage: `New to Colony? Welcome! Let’s get started with
      your first project.`,
  },
  dropdownLinkBodyProductsApp: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyProductsApp',
    defaultMessage: `Tools to organize and incentivize collaborators,
      contributors, and communities.`,
  },
  dropdownLinkBodyProductsPlatform: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkBodyProductsPlatform',
    defaultMessage: `The fastest way to build and deploy cryptoeconomic
      applications.`,
  },
  dropdownLinkTitleAboutColonyNetwork: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleAboutColonyNetwork',
    defaultMessage: 'colonyNetwork',
  },
  dropdownLinkTitleAboutMetacolony: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleAboutMetacolony',
    defaultMessage: 'The Metacolony',
  },
  dropdownLinkTitleAboutVision: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleAboutVision',
    defaultMessage: 'Vision',
  },
  dropdownLinkTitleDevDiscord: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleDevDiscord',
    defaultMessage: 'Discord',
  },
  dropdownLinkTitleDevGetStarted: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleDevGetStarted',
    defaultMessage: 'Get started',
  },
  dropdownLinkTitleProductsApp: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleProductsApp',
    defaultMessage: 'App',
  },
  dropdownLinkTitleProductsPlatform: {
    id: 'layouts.WebsiteLayout.Header.dropdownLinkTitleProductsPlatform',
    defaultMessage: 'Platform',
  },
});

const displayName = 'layouts.WebsiteLayout.Header';

const Header = ({
  appearance: appearanceProp,
  intl: { formatMessage },
  showOnScrollHeight,
}: Props) => {
  // Mobile nav state
  const [isNavOpen, setIsNavOpen] = useState(false);
  // Scrolled nav state
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

  const navAriaLabel = formatMessage(MSG.navAriaLabel);

  return (
    <div className={getMainClasses(appearance, styles)}>
      <div className={styles.wrapper}>
        <div className={styles.navigationContainer}>
          <div className={styles.leftWrapper}>
            <Link href={PAGE_INDEX}>
              <Icon
                className={styles.logo}
                name="colony_logo_horizontal"
                title="Colony"
                viewBox="0 0 134 33"
              />
            </Link>
          </div>
          <div aria-expanded={isNavOpen} className={styles.navContainer}>
            <nav
              aria-label={navAriaLabel}
              className={styles.navigation}
              role="navigation"
            >
              <NavDropdownParent
                className={`${styles.navDropdownParent} ${styles.navLink}`}
                image={withPrefix('img/nav_products.png')}
                navItems={[
                  {
                    body: MSG.dropdownLinkBodyProductsApp,
                    href: PAGE_PRODUCT_APP,
                    title: MSG.dropdownLinkTitleProductsApp,
                  },
                  {
                    body: MSG.dropdownLinkBodyProductsPlatform,
                    href: PAGE_PRODUCT_PLATFORM,
                    title: MSG.dropdownLinkTitleProductsPlatform,
                  },
                ]}
                text={MSG.navLinkProducts}
              />
              <NavDropdownParent
                className={`${styles.navDropdownParent} ${styles.navLink}`}
                image={withPrefix('img/nav_developers.png')}
                navItems={[
                  {
                    body: MSG.dropdownLinkBodyDevDiscord,
                    href: COLONY_DISCORD,
                    title: MSG.dropdownLinkTitleDevDiscord,
                  },
                  {
                    body: MSG.dropdownLinkBodyDevGetStarted,
                    href: DOCS_COLONYJS,
                    title: MSG.dropdownLinkTitleDevGetStarted,
                  },
                ]}
                text={MSG.navLinkDevelopers}
              />
              <NavDropdownParent
                className={`${styles.navDropdownParent} ${styles.navLink}`}
                image={withPrefix('img/nav_about.png')}
                navItems={[
                  {
                    body: MSG.dropdownLinkBodyAboutColonyNetwork,
                    href: PAGE_ABOUT_COLONY_NETWORK,
                    title: MSG.dropdownLinkTitleAboutColonyNetwork,
                  },
                  {
                    body: MSG.dropdownLinkBodyAboutMetacolony,
                    href: PAGE_ABOUT_METACOLONY,
                    title: MSG.dropdownLinkTitleAboutMetacolony,
                  },
                  {
                    body: MSG.dropdownLinkBodyAboutVision,
                    href: PAGE_ABOUT_VISION,
                    title: MSG.dropdownLinkTitleAboutVision,
                  },
                ]}
                text={MSG.navLinkAbout}
              />
              <Link
                className={`${styles.navLink} ${styles.navLinkStandard}`}
                href={COLONY_DISCORD}
                text={MSG.navLinkCommunity}
              />
              <div className={styles.mobileButtons}>
                <Button
                  appearance={{
                    borderRadius: 'none',
                    font: 'tiny',
                    theme: 'primary',
                  }}
                  className={styles.mobileButton}
                  linkTo={`${PAGE_INDEX}#${PAGE_ANCHOR_NEWSLETTER}`}
                  text={MSG.navLinkNewsletter}
                />
              </div>
            </nav>
          </div>
          <div className={styles.navToggle}>
            <NavigationToggle
              appearance={{ hideAtSize: 'medium' }}
              isNavOpen={isNavOpen}
              onClick={() => setIsNavOpen(!isNavOpen)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Header.displayName = displayName;

export default injectIntl(Header);
