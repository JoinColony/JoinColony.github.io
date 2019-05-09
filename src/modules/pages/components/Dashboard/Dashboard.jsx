/* @flow */

import type { IntlShape } from 'react-intl';
import type { WalletObjectType } from '@colony/purser-core';
import type { Socket } from 'socket.io-client';

import React, { Component } from 'react';
import { Router } from '@reach/router';
import { defineMessages, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import SEO from '~parts/SEO';

import type { Provider, Discourse, GitHub } from '~types';

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

export type Props = {|
  discourse?: Discourse,
  github?: GitHub,
  intl: IntlShape,
  page: string,
  setDiscourse?: (discourse?: Discourse) => void,
  setGitHub?: (github?: GitHub) => void,
  socket?: Socket,
  wallet?: WalletObjectType,
|};

class Dashboard extends Component<Props> {
  static displayName = 'pages.Dashboard';

  authenticate = (provider: Provider) => {
    const { socket } = this.props;
    if (socket) {
      const api = process.env.API_URL || 'http://localhost:8080';
      const url = `${api}/auth/${provider}/?socketId=${socket.id}`;
      if (typeof window !== 'undefined') window.open(url);
    }
  };

  disconnect = (provider: Provider) => {
    const { setGitHub, setDiscourse } = this.props;
    if (setDiscourse && provider === 'discourse') {
      setDiscourse(undefined);
    }
    if (setGitHub && provider === 'github') {
      setGitHub(undefined);
    }
  };

  render = () => {
    const {
      discourse,
      github,
      intl: { formatMessage },
      page,
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
    if (wallet && !github && !closing) {
      return <Login wallet={wallet} authenticate={this.authenticate} />;
    }
    return (
      <>
        <SEO description={MSG.pageDescription} title={title} />
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <main className={styles.main}>
          <div className={styles.mainInnerContainer}>
            <div className={styles.sidebar}>
              <Sidebar active={page || 'account'} />
            </div>
            {github && wallet ? (
              <main className={styles.content}>
                <Router primary={false}>
                  <Account
                    path={page ? '/dashboard/account' : '/dashboard'}
                    authenticate={this.authenticate}
                    disconnect={this.disconnect}
                    discourse={discourse}
                    github={github}
                    wallet={wallet}
                  />
                  <Colonies
                    path="/dashboard/colonies"
                    discourse={discourse}
                    github={github}
                    wallet={wallet}
                  />
                  <Contributions
                    path="/dashboard/contributions"
                    discourse={discourse}
                    github={github}
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

export default injectIntl(Dashboard);
