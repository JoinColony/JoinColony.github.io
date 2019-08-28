/* @flow */

import type {
  ColonyClient,
  ColonyNetworkClient,
} from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';
import type { IntlShape } from 'react-intl';

import React from 'react';
import { Router } from '@reach/router';
import { defineMessages } from 'react-intl';

import SEO from '~parts/SEO';

import {
  PAGE_DEVELOPER_PORTAL_DASHBOARD,
  PAGE_DEVELOPER_PORTAL_DASHBOARD_ACCOUNT,
  PAGE_DEVELOPER_PORTAL_DASHBOARD_ADMIN,
  PAGE_DEVELOPER_PORTAL_DASHBOARD_COLONIES,
  PAGE_DEVELOPER_PORTAL_DASHBOARD_CONTRIBUTIONS,
} from '~routes';

import type { Network, Provider, User } from '~types';

import SpinnerLoader from '~core/SpinnerLoader';

import Login from './Login';
import Sidebar from './Sidebar';

import Account from './Account';
import Admin from './Admin';
import Colonies from './Colonies';
import Contributions from './Contributions';

import styles from './Dashboard.module.css';

const MSG = defineMessages({
  pageDescription: {
    id: 'pages.Dashboard.pageDescription',
    defaultMessage: `A dashboard for developers building with Colony. Manage
    your developer account, add and remove colonies from your watchlist, and
    earn reputation and tokens for contributing to our open source projects.`,
  },
  pageTitle: {
    id: 'pages.Dashboard.pageTitle',
    defaultMessage: 'Developer Dashboard',
  },
});

type Props = {|
  authenticate: (provider: Provider) => void,
  colonyClient: ?ColonyClient,
  disconnect: (provider: Provider) => void,
  intl: IntlShape,
  network: ?Network,
  networkClient: ?ColonyNetworkClient,
  page: string,
  serverError?: string,
  setUser: (user: ?User) => void,
  user: ?User,
  wallet: ?WalletObjectType,
|};

const displayName = 'pages.Dashboard';

const Dashboard = ({
  authenticate,
  colonyClient,
  disconnect,
  intl: { formatMessage },
  network,
  networkClient,
  page,
  serverError,
  setUser,
  user,
  wallet,
}: Props) => {
  const title = formatMessage(MSG.pageTitle);
  if (typeof window !== 'undefined' && page === 'close') {
    window.close();
  }
  if (!wallet && !user) {
    return <div style={{ height: '100vh' }} />;
  }
  if (wallet && !user) {
    return (
      <Login
        authenticate={authenticate}
        serverError={serverError}
        wallet={wallet}
      />
    );
  }
  return (
    <>
      <SEO description={MSG.pageDescription} title={title} />
      <main className={styles.main}>
        {user && (
          <>
            <div className={styles.sidebar}>
              <Sidebar
                active={page || 'colonies'}
                network={network}
                user={user}
              />
            </div>
            {network && wallet ? (
              <div className={styles.content}>
                <Router primary={false}>
                  <Colonies
                    path={
                      page
                        ? PAGE_DEVELOPER_PORTAL_DASHBOARD_COLONIES
                        : PAGE_DEVELOPER_PORTAL_DASHBOARD
                    }
                    network={network}
                    networkClient={networkClient}
                    setUser={setUser}
                    user={user}
                    wallet={wallet}
                  />
                  <Contributions
                    path={PAGE_DEVELOPER_PORTAL_DASHBOARD_CONTRIBUTIONS}
                    network={network}
                    user={user}
                    wallet={wallet}
                  />
                  <Account
                    path={PAGE_DEVELOPER_PORTAL_DASHBOARD_ACCOUNT}
                    authenticate={authenticate}
                    colonyClient={colonyClient}
                    disconnect={disconnect}
                    network={network}
                    serverError={serverError}
                    setUser={setUser}
                    user={user}
                    wallet={wallet}
                  />
                  <Admin
                    path={PAGE_DEVELOPER_PORTAL_DASHBOARD_ADMIN}
                    colonyClient={colonyClient}
                    network={network}
                    user={user}
                  />
                </Router>
              </div>
            ) : (
              <div className={styles.loading}>
                <SpinnerLoader
                  appearance={{ theme: 'primary', size: 'huge' }}
                />
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

Dashboard.displayName = displayName;

export default Dashboard;
