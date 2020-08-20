/* @flow */

import { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import type { IntlShape } from 'react-intl';

import type { Project } from '~types';

import { transformProjectData } from '~utils/docs';

const useDocsLinks = (intl: IntlShape) => {
  const { locale } = intl;
  const projectQueryData = useStaticQuery(graphql`
    {
      ...coreProjectsFragment
      ...externalProjectsFragment
      ...openSourceProjectsFragment
    }
  `);

  const {
    site: {
      siteMetadata: { externalDocs },
    },
  } = projectQueryData;

  const coreGitHubDocs: Array<Project> = useMemo(
    () =>
      projectQueryData.coreProjects.edges.map(edge =>
        transformProjectData(edge, locale),
      ) || [],
    [locale, projectQueryData.coreProjects.edges],
  );
  const openSourceGitHubDocs: Array<Project> = useMemo(
    () =>
      projectQueryData.openSourceProjects.edges.map(edge =>
        transformProjectData(edge, locale),
      ) || [],
    [locale, projectQueryData.openSourceProjects.edges],
  );

  const coreProjects = useMemo(
    () => [
      ...coreGitHubDocs,
      ...externalDocs.filter(({ type }) => type === 'core'),
    ],
    [coreGitHubDocs, externalDocs],
  );

  const openSourceProjects = useMemo(
    () => [
      ...openSourceGitHubDocs,
      ...externalDocs.filter(({ type }) => type === 'tool'),
    ],
    [externalDocs, openSourceGitHubDocs],
  );

  return { coreProjects, openSourceProjects };
};

export default useDocsLinks;
