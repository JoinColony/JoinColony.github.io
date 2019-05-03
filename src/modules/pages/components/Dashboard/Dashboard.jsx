/* @flow */

import type { IntlShape } from 'react-intl';
import type { WalletObjectType } from '@colony/purser-core';
import type { Socket } from 'socket.io-client';

import React, { Component } from 'react';
import { Router } from '@reach/router';
import { defineMessages, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { accountChangeHook, open } from '@colony/purser-metamask';
import io from 'socket.io-client';

import SEO from '~parts/SEO';

import type { GitHub } from './types';

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
  page: string,
  intl: IntlShape,
|};

type State = {
  github?: GitHub,
  socket?: Socket,
  wallet?: WalletObjectType,
};

class Dashboard extends Component<Props, State> {
  static displayName = 'pages.Dashboard';

  constructor(props) {
    super(props);
    this.state = {
      github: undefined,
      socket: undefined,
      wallet: undefined,
    };
  }

  async componentDidMount() {
    this.getUserWallet();
    this.connectMetaMask();
    this.openUserWallet();
    const github = this.getGitHubUser();
    if (!github) this.connectSocket();
  }

  componentWillUnmount() {
    const {
      setGitHubUser,
      state: { socket },
    } = this;
    if (socket) {
      socket.off('github', setGitHubUser);
      socket.disconnect();
    }
  }

  authenticate = () => {
    const { socket } = this.state;
    if (socket) {
      const api = process.env.API_URL || 'http://localhost:8080';
      const url = `${api}/auth/github?socketId=${socket.id}`;
      if (typeof window !== 'undefined') window.open(url);
    }
  };

  connectMetaMask = async () => {
    const handleAccountChange = metamask => {
      if (!metamask.selectedAddress) {
        this.setUserWallet(undefined);
      }
    };
    await accountChangeHook(handleAccountChange);
  };

  connectSocket = () => {
    const { setGitHubUser } = this;
    const socket = io.connect(process.env.SOCKET || 'http://localhost:8080');
    socket.on('github', setGitHubUser);
    this.setState({ socket });
  };

  disconnectGitHub = () => {
    if (typeof window !== 'undefined') {
      this.connectSocket();
      window.localStorage.removeItem('github');
      this.setState({ github: undefined });
    }
  };

  getGitHubUser = () => {
    if (typeof window !== 'undefined') {
      const github = window.localStorage.getItem('github');
      this.setState({ github: JSON.parse(github) });
    }
  };

  getUserWallet = () => {
    if (typeof window !== 'undefined') {
      const wallet = window.localStorage.getItem('wallet');
      this.setState({ wallet: JSON.parse(wallet) });
    }
  };

  openUserWallet = async () => {
    const wallet = await open();
    if (wallet.address) {
      this.setUserWallet(wallet);
    } else {
      this.setUserWallet(undefined);
    }
  };

  setGitHubUser = github => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('github', JSON.stringify(github));
      this.setState({ github });
    }
  };

  setUserWallet = wallet => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('wallet', JSON.stringify(wallet));
      this.setState({ wallet });
    }
  };

  render = () => {
    const {
      page,
      intl: { formatMessage },
    } = this.props;
    const { wallet, github } = this.state;
    const title = formatMessage(MSG.pageTitle);

    if (!wallet) {
      return <MetaMask />;
    }
    if (wallet && !github) {
      return <Login wallet={wallet} authenticate={this.authenticate} />;
    }
    if (typeof window !== 'undefined' && page === 'close') {
      window.close();
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
              <Sidebar active={page} />
            </div>
            {github && wallet && (
              <main className={styles.content}>
                <Router primary={false}>
                  <Account
                    path={page ? '/dashboard/account' : '/dashboard'}
                    disconnectGitHub={this.disconnectGitHub}
                    github={github}
                    wallet={wallet}
                  />
                  <Colonies
                    path="/dashboard/colonies"
                    github={github}
                    wallet={wallet}
                  />
                  <Contributions
                    path="/dashboard/contributions"
                    github={github}
                    wallet={wallet}
                  />
                </Router>
              </main>
            )}
          </div>
        </main>
      </>
    );
  };
}

export default injectIntl(Dashboard);
