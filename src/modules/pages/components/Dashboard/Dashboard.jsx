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
import { Helmet } from 'react-helmet';

import SEO from '~parts/SEO';

import type { Network, Provider, User } from '~types';

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
  network: Network,
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
  const close = page === 'close';
  if (typeof window !== 'undefined' && close) {
    window.close();
  }
  if (wallet && !user && !close) {
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
      {/*
        Helmet title must be a prop to work with react hooks.
        See https://github.com/nfl/react-helmet/issues/437
      */}
      <Helmet title={title} />
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar active={page || 'account'} user={user} />
        </div>
        {wallet && user ? (
          <main className={styles.content}>
            <Router primary={false}>
              <Admin path="/dashboard/admin" colonyClient={colonyClient} />
              <Account
                path={page ? '/dashboard/account' : '/dashboard'}
                authenticate={authenticate}
                disconnect={disconnect}
                network={network}
                setUser={setUser}
                user={user}
                wallet={wallet}
              />
              <Colonies
                path="/dashboard/colonies"
                network={network}
                networkClient={networkClient}
                setUser={setUser}
                user={user}
                wallet={wallet}
              />
              <Contributions
                path="/dashboard/contributions"
                user={user}
                wallet={wallet}
              />
            </Router>
          </main>
        ) : (
          <div style={{ height: '100vh' }} />
        )}
      </main>
    </>
  );
};

Dashboard.displayName = displayName;

export default Dashboard;
