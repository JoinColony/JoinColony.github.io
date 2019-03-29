/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import type { Project } from '~types';

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

const getProjectLinks = ({ entryPoint, name }: Project) => ({
  href: entryPoint,
  text: name,
});

type Props = {|
  coreProjects: Array<Project>,
  openSourceProjects: Array<Project>,
|};

const displayName = 'layouts.DeveloperPortalLayout.DocsDropdown';

const DocsDropdown = ({ coreProjects, openSourceProjects }: Props) => {
  const coreProjectsLinks = coreProjects.map(getProjectLinks);
  const openSourceProjectsLinks = openSourceProjects.map(getProjectLinks);
  const featureProject = coreProjects.find(({ name }) => name === 'colonyJS');
  return (
    <div className={styles.main}>
      {featureProject && (
        <Link className={styles.heroLink} href={featureProject.entryPoint}>
          <div className={styles.hero}>
            <div className={styles.logoContainer}>
              {/* @TODO use logomark from GitHub docs once added there */}
              <Icon
                className={styles.logo}
                name="logomark_colonyjs"
                title={MSG.heroTitle}
                viewBox="0 0 94 94"
              />
            </div>
            <div className={styles.cta}>
              <Heading
                appearance={{
                  margin: 'none',
                  size: 'small',
                  theme: 'light',
                  weight: 'thin',
                }}
                text={MSG.heroSubTitle}
              />
              <Heading
                appearance={{
                  margin: 'none',
                  size: 'medium',
                  theme: 'dark',
                  weight: 'thin',
                }}
                text={MSG.heroTitle}
              />
            </div>
          </div>
        </Link>
      )}
      <div className={styles.menuContent}>
        <div className={styles.menuContainer}>
          <VerticalMenu
            appearance={{ margins: 'small' }}
            headingAppearance={{
              size: 'small',
              theme: 'light',
              weight: 'thin',
            }}
            headingText={MSG.headingCoreProducts}
            menuItems={coreProjectsLinks}
          />
        </div>
        <div className={styles.menuContainer}>
          <VerticalMenu
            appearance={{ expandForViewport: 'medium', margins: 'small' }}
            headingAppearance={{
              size: 'small',
              theme: 'light',
              weight: 'thin',
            }}
            headingText={MSG.headingOpenSourceProducts}
            menuItems={openSourceProjectsLinks}
            numColumns={2}
          />
        </div>
      </div>
    </div>
  );
};

DocsDropdown.displayName = displayName;

export default DocsDropdown;
