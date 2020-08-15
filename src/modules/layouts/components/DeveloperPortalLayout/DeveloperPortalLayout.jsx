/* @flow */

import type { Element } from 'react';
import type { IntlShape } from 'react-intl';

import React, { Component, useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import type { Project } from '~types';

import { transformProjectData } from '~utils/docs';

import Header from './Header';
import Footer from './Footer';

import './DeveloperPortalLayout.module.css';

type Props = {|
  children: Element<typeof Component>,
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
  const coreProjects: Array<Project> = useMemo(
    () =>
      projectQueryData.coreProjects.edges.map(edge =>
        transformProjectData(edge, locale),
      ) || [],
    [locale, projectQueryData.coreProjects.edges],
  );
  const openSourceProjects: Array<Project> = useMemo(
    () =>
      projectQueryData.openSourceProjects.edges.map(edge =>
        transformProjectData(edge, locale),
      ) || [],
    [locale, projectQueryData.openSourceProjects.edges],
  );

  return (
    <div>
      <Header
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
      {children}
      <Footer
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
    </div>
  );
};

DeveloperPortalLayout.displayName = displayName;

export default DeveloperPortalLayout;
