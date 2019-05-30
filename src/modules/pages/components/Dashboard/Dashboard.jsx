/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';
import type { IntlShape } from 'react-intl';
import type { Socket } from 'socket.io-client';

import React, { Component } from 'react';
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

const server = process.env.SERVER_URL || 'http://localhost:8080';

type Props = {|
  error: ?string,
  intl: IntlShape,
  network: Network,
  networkClient: ?ColonyNetworkClient,
  page: string,
  setUser: (user: ?User) => void,
  socket: ?Socket,
  user: ?User,
  wallet: ?WalletObjectType,
|};

class Dashboard extends Component<Props> {
  static displayName = 'pages.Dashboard';

  authenticate = (provider: Provider) => {
    const { socket, wallet } = this.props;
    if (socket && wallet) {
      const url = `${server}/auth/${provider}/`;
      const params = `?socketId=${socket.id}&address=${wallet.address}`;
      if (typeof window !== 'undefined') window.open(url + params);
    }
  };

  disconnect = (provider: Provider) => {
    const { setUser, user } = this.props;
    if (setUser && provider === 'discourse') {
      setUser({ ...user, discourse: null });
    }
    if (setUser && provider === 'github') {
      setUser(null);
    }
  };

  render = () => {
    const {
      error,
      intl: { formatMessage },
      network,
      networkClient,
      page,
      setUser,
      user,
      wallet,
    } = this.props;
    const title = formatMessage(MSG.pageTitle);
    const closing = page === 'close';

    if (typeof window !== 'undefined' && closing) {
      window.close();
    }
    if (!wallet && !closing) {
      return <MetaMask />;
    }
    if (wallet && !user && !closing) {
      return (
        <Login authenticate={this.authenticate} error={error} wallet={wallet} />
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
          <div className={styles.mainInnerContainer}>
            <div className={styles.sidebar}>
              <Sidebar active={page || 'account'} />
            </div>
            {wallet && user ? (
              <main className={styles.content}>
                <Router primary={false}>
                  <Account
                    path={page ? '/dashboard/account' : '/dashboard'}
                    authenticate={this.authenticate}
                    disconnect={this.disconnect}
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
}

export default Dashboard;
