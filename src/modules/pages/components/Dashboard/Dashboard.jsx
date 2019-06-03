/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';
import type { IntlShape } from 'react-intl';

import React from 'react';
import { Router } from '@reach/router';
import { defineMessages } from 'react-intl';
import { Helmet } from 'react-helmet';

import SEO from '~parts/SEO';

import type { Network, Provider, User } from '~types';

import Login from './Login';
import MetaMask from './MetaMask';
import Sidebar from './Sidebar';

import Account from './Account';
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
  disconnect: (provider: Provider) => void,
  error: ?string,
  intl: IntlShape,
  network: Network,
  networkClient: ?ColonyNetworkClient,
  page: string,
  setUser: (user: ?User) => void,
  user: ?User,
  wallet: ?WalletObjectType,
|};

const displayName = 'pages.Dashboard';

const Dashboard = ({
  authenticate,
  disconnect,
  error,
  intl: { formatMessage },
  network,
  networkClient,
  page,
  setUser,
  user,
  wallet,
}: Props) => {
  const title = formatMessage(MSG.pageTitle);
  const close = page === 'close';
  if (typeof window !== 'undefined' && close) {
    window.close();
  }
  if (!wallet && !close) {
    return <MetaMask />;
  }
  if (wallet && !user && !close) {
    return <Login authenticate={authenticate} error={error} wallet={wallet} />;
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
        <div className={styles.mainInnerContainer}>
          <div className={styles.sidebar}>
            <Sidebar active={page || 'account'} />
          </div>
          {wallet && user ? (
            <main className={styles.content}>
              <Router primary={false}>
                <Account
                  path={page ? '/dashboard/account' : '/dashboard'}
                  authenticate={authenticate}
                  disconnect={disconnect}
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
        </div>
      </main>
    </>
  );
};

Dashboard.displayName = displayName;

export default Dashboard;
