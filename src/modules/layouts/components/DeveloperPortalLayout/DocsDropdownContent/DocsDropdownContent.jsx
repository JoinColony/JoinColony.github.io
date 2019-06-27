/* @flow */

import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages } from 'react-intl';

import type { Project } from '~types';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import VerticalMenu from '~core/VerticalMenu';

import { coreProjectSortOrder } from '~pages/Developers/CoreProducts';
import { openSourceProjectSortOrder } from '~pages/Developers/OpenSource';

import styles from './DocsDropdownContent.module.css';

const MSG = defineMessages({
  ariaLabel: {
    id: 'layouts.DeveloperPortalLayout.DocsDropdownContent.ariaLabel',
    defaultMessage: 'Docs Menu',
  },
  heroTitle: {
    id: 'layouts.DeveloperPortalLayout.DocsDropdownContent.heroTitle',
    defaultMessage: 'Start building with Colony',
  },
  heroSubTitle: {
    id: 'layouts.DeveloperPortalLayout.DocsDropdownContent.heroSubTitle',
    defaultMessage: 'Get started',
  },
  headingCoreProducts: {
    id: 'layouts.DeveloperPortalLayout.DocsDropdownContent.headingCoreProducts',
    defaultMessage: 'Colony Core',
  },
  headingOpenSourceProducts: {
    id:
      // eslint-disable-next-line max-len
      'layouts.DeveloperPortalLayout.DocsDropdownContent.headingOpenSourceProducts',
    defaultMessage: 'Open Source Tools',
  },
});

const getProjectLinks = ({ entryPoint, name }: Project) => ({
  href: entryPoint,
  text: name,
});

type Props = {|
  coreProjects: Array<Project>,
  intl: IntlShape,
  openSourceProjects: Array<Project>,
|};

const displayName = 'layouts.DeveloperPortalLayout.DocsDropdownContent';

const DocsDropdownContent = ({
  coreProjects,
  intl: { formatMessage },
  openSourceProjects,
}: Props) => {
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
  const featureProject = coreProjects.find(({ name }) => name === 'colonyJS');
  const ariaLabel = formatMessage(MSG.ariaLabel);
  return (
    <div className={styles.main} aria-label={ariaLabel}>
      {featureProject && (
        <Link className={styles.heroLink} href={featureProject.entryPoint}>
          <div className={styles.hero}>
            <div className={styles.logoContainer}>
              <Image
                alt={featureProject.name}
                className={styles.logo}
                project={featureProject.name}
                src={featureProject.logoSmall}
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

DocsDropdownContent.displayName = displayName;

export default DocsDropdownContent;
