/* @flow */

import type { Element } from 'react';
import type { IntlShape } from 'react-intl';

import React, { Component, cloneElement, useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import type { Project } from '~types';

import { transformProjectData } from '~utils/docs';

import useColonyClient from './useColonyClient';
import useMetaMask from './useMetaMask';
import useNetworkClient from './useNetworkClient';
import usePortalServer from './usePortalServer';

import Header from './Header';
import Footer from './Footer';
import MetaMask from './MetaMask';

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
  const pathContribute: boolean = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.split('/')[1] === 'contribute';
    }
    return false;
  }, []);
  const pathContribution: boolean = useMemo(() => {
    if (typeof window !== 'undefined') {
      return (
        window.location.pathname.split('/')[1] === 'contribute' &&
        window.location.pathname.split('/')[2]
      );
    }
    return false;
  }, []);
  const pathDashboard: boolean = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.split('/')[1] === 'dashboard';
    }
    return false;
  }, []);
  const walletRequired: boolean = useMemo(() => {
    if (typeof window !== 'undefined') {
      return pathContribution || pathDashboard;
    }
    return false;
  }, [pathContribution, pathDashboard]);
  const { loadedNetwork, network, wallet } = useMetaMask(walletRequired);
  const { networkClient } = useNetworkClient(loadedNetwork, network, wallet);
  const { colonyClient } = useColonyClient(network, networkClient);
  const {
    authenticate,
    disconnect,
    serverError,
    setUser,
    user,
  } = usePortalServer(wallet);
  return (
    <div>
      <Header
        coreProjects={coreProjects}
        network={network}
        openSourceProjects={openSourceProjects}
        pathDashboard={pathDashboard}
        user={user}
        wallet={wallet}
      />
      {!wallet && walletRequired ? (
        <MetaMask />
      ) : (
        <div>
          {pathContribute || pathDashboard
            ? cloneElement(children, {
                authenticate,
                colonyClient,
                disconnect,
                network,
                networkClient,
                serverError,
                setUser,
                user,
                wallet,
              })
            : children}
        </div>
      )}
      <Footer
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
    </div>
  );
};

DeveloperPortalLayout.displayName = displayName;

export default DeveloperPortalLayout;
