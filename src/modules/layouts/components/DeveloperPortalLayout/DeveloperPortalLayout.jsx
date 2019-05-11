/* @flow */

import type { Element } from 'react';
import type { IntlShape } from 'react-intl';

import { Match } from '@reach/router';
import React, { Component, cloneElement, useMemo } from 'react';
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
  match: ?{
    ['*']: string,
    uri: string,
    path: string,
  },
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
  const { setUser, socket, user } = useAuthServer();
  const { network, wallet } = useMetaMask();
  return (
    <Match path="/dashboard/*">
      {props => (
        <div>
          <Header
            coreProjects={coreProjects}
            match={props.match}
            network={network}
            openSourceProjects={openSourceProjects}
            user={user}
            wallet={wallet}
          />
          <div className={styles.body}>
            {props.match
              ? cloneElement(children, {
                  network,
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
      )}
    </Match>
  );
};

DeveloperPortalLayout.displayName = displayName;

export default DeveloperPortalLayout;
