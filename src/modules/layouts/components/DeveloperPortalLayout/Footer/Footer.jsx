/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import type { Project } from '~types';

import Icon from '~core/Icon';
import Link from '~core/Link';
import VerticalMenu from '~core/VerticalMenu';
import MetaNav from '~parts/MetaNav';
import SocialNav from '~parts/SocialNav';
import { COLONY_DISCOURSE, COLONY_WEBSITE } from '~routes';

import { coreProjectSortOrder } from '~pages/Developers/CoreProducts';
import { openSourceProjectSortOrder } from '~pages/Developers/OpenSource';

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
  const coreProjectsLinks = coreProjects
    .map(getProjectLinks)
    .sort(
      ({ text: textA }, { text: textB }) =>
        coreProjectSortOrder.indexOf(textA) -
        coreProjectSortOrder.indexOf(textB),
    );
  const openSourceProjectsLinks = openSourceProjects
    .map(getProjectLinks)
    .sort(
      ({ text: textA }, { text: textB }) =>
        openSourceProjectSortOrder.indexOf(textA) -
        openSourceProjectSortOrder.indexOf(textB),
    );
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
                appearance={{ expandForViewport: 'medium', margins: 'large' }}
                headingAppearance={{ theme: 'invert' }}
                headingText={MSG.navTitleOpenSourceTools}
                menuItems={openSourceProjectsLinks}
                numColumns={2}
              />
            </div>
          </div>
        </div>
        <div className={styles.metaRow}>
          <MetaNav />
          <div className={styles.socialIconContainer}>
            <SocialNav />
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.displayName = displayName;

export default Footer;
