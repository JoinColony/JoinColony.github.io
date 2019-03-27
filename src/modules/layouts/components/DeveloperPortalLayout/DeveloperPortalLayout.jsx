/* @flow */
import type { Node } from 'react';
import type { IntlShape } from 'react-intl';

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import type { Project } from '~types';

import Header from './Header';
import Footer from './Footer';
import { transformProjectData } from '~utils/docs';

import styles from './DeveloperPortalLayout.module.css';

type Props = {|
  children: Node,
  intl: IntlShape,
|};

const displayName = 'layouts.DeveloperPortalLayout';

const DeveloperPortalLayout = ({ children, intl: { locale } }: Props) => {
  const projectQueryData = useStaticQuery(graphql`
    {
      ...coreProjectsFragment
      ...openSourceProjectsFragment
    }
  `);
  const coreProjects: Array<Project> =
    projectQueryData.coreProjects.edges.map(edge =>
      transformProjectData(edge, locale),
    ) || [];
  const openSourceProjects: Array<Project> =
    projectQueryData.openSourceProjects.edges.map(edge =>
      transformProjectData(edge, locale),
    ) || [];
  return (
    <div className={styles.gridContainer}>
      <Header
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
      <div>{children}</div>
      <Footer
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
    </div>
  );
};

DeveloperPortalLayout.displayName = displayName;

export default DeveloperPortalLayout;
