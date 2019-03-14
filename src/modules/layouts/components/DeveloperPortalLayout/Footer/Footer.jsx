/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import Icon from '~core/Icon';
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
    id: 'layouts.DeveloperPortalLayout.Footer.navTitleOpenSourceTools',
    defaultMessage: 'Open Source Tools',
  },
  metaLinkTos: {
    id: 'layouts.DeveloperPortalLayout.Footer.metaLinkTos',
    defaultMessage: 'Terms & Service',
  },
  metaLinkPrivacy: {
    id: 'layouts.DeveloperPortalLayout.Footer.metaLinkPrivacy',
    defaultMessage: 'Privacy Policy',
  },
  metaLinkMediaKit: {
    id: 'layouts.DeveloperPortalLayout.Footer.metaLinkMediaKit',
    defaultMessage: 'Media Kit',
  },
});

const displayName = 'layouts.DeveloperPortalLayout.Footer';

const Footer = () => (
  <div className={styles.main}>
    <div className={styles.footerContent}>
      <div className={styles.navRow}>
        <div className={styles.logoContainer}>
          <Icon className={styles.logo} name="colony_logomark" title="Colony" />
          <div>
            <Link
              href="https://colony.io"
              text={MSG.linkVisitColony}
              textValues={{ domain: 'colony.io' }}
            />
          </div>
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
          <nav className={styles.metaNav}>
            {/* @TODO: fix these links... */}
            <Link
              href="/terms-and-service"
              className={styles.metaNavLink}
              text={MSG.metaLinkTos}
            />
            <Link
              href="/privacy-policy"
              className={styles.metaNavLink}
              text={MSG.metaLinkPrivacy}
            />
            <Link
              href="/media-kit"
              className={styles.metaNavLink}
              text={MSG.metaLinkMediaKit}
            />
          </nav>
        </div>
        <div className={styles.socialIconContainer}>
          <Link alt="Ghost" href="https://blog.colony.io/">
            <Icon
              className={styles.socialIcon}
              title="Ghost"
              name="social_ghost_devPortal"
            />
          </Link>
          <Link alt="Twitter" href="https://twitter.com/joincolony">
            <Icon
              className={styles.socialIcon}
              title="Twitter"
              name="social_twitter_devPortal"
            />
          </Link>
          <Link alt="Discourse" href="https://build.colony.io/">
            <Icon
              className={styles.socialIcon}
              title="Discourse"
              name="social_discourse_devPortal"
            />
          </Link>
          <Link alt="GitHub" href="https://github.com/JoinColony">
            <Icon
              className={styles.socialIcon}
              title="GitHub"
              name="social_github_devPortal"
            />
          </Link>
          <Link alt="Gitter" href="https://gitter.im/JoinColony/colonyJS">
            <Icon
              className={styles.socialIcon}
              title="Gitter"
              name="social_gitter_devPortal"
            />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

Footer.displayName = displayName;

export default Footer;
