/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import type { Project } from '~types';

import Icon from '~core/Icon';
import Link from '~core/Link';
import VerticalMenu from '~core/VerticalMenu';
import {
  COLONY_BLOG,
  COLONY_DISCOURSE,
  COLONY_GITHUB,
  COLONY_GITTER,
  COLONY_TWITTER,
  COLONY_WEBSITE,
  PAGE_MEDIA_KIT,
  PAGE_PRIVACY_POLICY,
  PAGE_TERMS_SERVICE,
  PAGE_TUTORIALS,
} from '~routes';

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

const getProjectLinks = ({ repoUrl, name }: Project) => ({
  href: repoUrl,
  text: name,
});

type Props = {|
  coreProjects: Array<Project>,
  openSourceProjects: Array<Project>,
|};

const displayName = 'layouts.DeveloperPortalLayout.Footer';

const Footer = ({ coreProjects, openSourceProjects }: Props) => {
  const coreProjectsLinks = coreProjects.map(getProjectLinks);
  const openSourceProjectsLinks = openSourceProjects.map(getProjectLinks);
  return (
    <div className={styles.main}>
      <div className={styles.footerContent}>
        <div className={styles.navRow}>
          <div className={styles.logoContainer}>
            <Icon
              className={styles.logo}
              name="colony_logomark"
              title="Colony"
            />
            <div>
              <Link
                href={COLONY_WEBSITE}
                text={MSG.linkVisitColony}
                textValues={{ domain: 'colony.io' }}
              />
            </div>
          </div>
          <div className={styles.navGroup}>
            <div className={styles.navGroupItem}>
              <VerticalMenu
                appearance={{ margins: 'large' }}
                headingAppearance={{ theme: 'invert' }}
                headingText={MSG.navTitleGetStarted}
                menuItems={[
                  { href: PAGE_TUTORIALS, text: MSG.navLinkTutorials },
                  {
                    href: COLONY_DISCOURSE,
                    text: MSG.navLinkSupport,
                  },
                ]}
              />
            </div>
            <div className={styles.navGroupItem}>
              <VerticalMenu
                appearance={{ margins: 'large' }}
                headingAppearance={{ theme: 'invert' }}
                headingText={MSG.navTitleCoreProducts}
                menuItems={coreProjectsLinks}
              />
            </div>
            <div className={styles.navGroupItem}>
              <VerticalMenu
                appearance={{ margins: 'large' }}
                headingAppearance={{ theme: 'invert' }}
                headingText={MSG.navTitleOpenSourceTools}
                menuItems={openSourceProjectsLinks}
                numColumns={2}
              />
            </div>
          </div>
        </div>
        <div className={styles.metaRow}>
          <div className={styles.metaNavContainer}>
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
              <Link
                href={PAGE_MEDIA_KIT}
                className={styles.metaNavLink}
                text={MSG.metaLinkMediaKit}
              />
            </nav>
          </div>
          <div className={styles.socialIconContainer}>
            <Link alt="Ghost" href={COLONY_BLOG}>
              <Icon
                className={styles.socialIcon}
                title="Ghost"
                name="social_ghost_devPortal"
              />
            </Link>
            <Link alt="Twitter" href={COLONY_TWITTER}>
              <Icon
                className={styles.socialIcon}
                title="Twitter"
                name="social_twitter_devPortal"
              />
            </Link>
            <Link alt="Discourse" href={COLONY_DISCOURSE}>
              <Icon
                className={styles.socialIcon}
                title="Discourse"
                name="social_discourse_devPortal"
              />
            </Link>
            <Link alt="GitHub" href={COLONY_GITHUB}>
              <Icon
                className={styles.socialIcon}
                title="GitHub"
                name="social_github_devPortal"
              />
            </Link>
            <Link alt="Gitter" href={COLONY_GITTER}>
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
};

Footer.displayName = displayName;

export default Footer;
