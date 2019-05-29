/* @flow */

import type { Element } from 'react';
import type { IntlShape } from 'react-intl';

import React, { Component, cloneElement, useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import type { Project } from '~types';

import { transformProjectData } from '~utils/docs';

import useColonyNetwork from './useColonyNetwork';
import useMetaMask from './useMetaMask';
import usePortalServer from './usePortalServer';

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
  const dashboard: boolean = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.split('/')[1] === 'dashboard';
    }
    return false;
  }, []);
  const { network, wallet } = useMetaMask(dashboard);
  const { error, setUser, socket, user } = usePortalServer();
  const { networkClient } = useColonyNetwork(network, wallet);
  return (
    <div>
      <Header
        coreProjects={coreProjects}
        dashboard={dashboard}
        network={network}
        openSourceProjects={openSourceProjects}
        user={user}
        wallet={wallet}
      />
      <div className={styles.body}>
        {dashboard
          ? cloneElement(children, {
              error,
              network,
              networkClient,
              setUser,
              socket,
              user,
              wallet,
            })
          : children}
      </div>
      <Footer
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
    </div>
  );
};

DeveloperPortalLayout.displayName = displayName;

export default DeveloperPortalLayout;
