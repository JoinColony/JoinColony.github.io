/* @flow */
import type { Element } from 'react';
import type { IntlShape } from 'react-intl';

import React, { Component, cloneElement, isValidElement } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import type { Project } from '~types';

import { transformProjectData } from '~utils/docs';

import useAuthServer from './useAuthServer';
import useMetaMask from './useMetaMask';

import Header from './Header';
import Footer from './Footer';

import styles from './DeveloperPortalLayout.module.css';

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
  const coreProjects: Array<Project> =
    projectQueryData.coreProjects.edges.map(edge =>
      transformProjectData(edge, locale),
    ) || [];
  const openSourceProjects: Array<Project> =
    projectQueryData.openSourceProjects.edges.map(edge =>
      transformProjectData(edge, locale),
    ) || [];

  const {
    discourse,
    github,
    setDiscourse,
    setGitHub,
    socket,
  } = useAuthServer();
  const { network, wallet } = useMetaMask();

  return (
    <>
      <Header
        coreProjects={coreProjects}
        github={github}
        network={network}
        openSourceProjects={openSourceProjects}
        wallet={wallet}
      />
      <div className={styles.body}>
        {isValidElement(children)
          ? cloneElement(children, {
              discourse,
              github,
              setDiscourse,
              setGitHub,
              socket,
              wallet,
            })
          : children}
      </div>
      <Footer
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
    </>
  );
};

DeveloperPortalLayout.displayName = displayName;

export default DeveloperPortalLayout;
