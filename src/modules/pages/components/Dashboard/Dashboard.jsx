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

import type { Discourse, GitHub } from './types';

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
  fetchingWallet: boolean,
  discourse?: Discourse,
  github?: GitHub,
  socket?: Socket,
  wallet?: WalletObjectType,
};

class Dashboard extends Component<Props, State> {
  static displayName = 'pages.Dashboard';

  constructor(props) {
    super(props);
    this.state = {
      fetchingWallet: false,
      discourse: undefined,
      github: undefined,
      socket: undefined,
      wallet: undefined,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    this.getUserWallet();
    this.connectMetaMask();
    this.openUserWallet();
    const github = this.getGitHubUser();
    if (!github) this.connectSocket();
    this.getDiscourseUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
    const {
      setDiscourseUser,
      setGitHubUser,
      state: { socket },
    } = this;
    if (socket) {
      socket.off('discourse', setDiscourseUser);
      socket.off('github', setGitHubUser);
      socket.disconnect();
    }
  }

  _isMounted = false;

  authenticate = provider => {
    const { socket } = this.state;
    if (socket) {
      const api = process.env.API_URL || 'http://localhost:8080';
      const url = `${api}/auth/${provider}/?socketId=${socket.id}`;
      if (typeof window !== 'undefined') window.open(url);
    }
  };

  connectMetaMask = async () => {
    const handleAccountChange = metamask => {
      if (this._isMounted) {
        const { fetchingWallet, wallet } = this.state;
        if (wallet && !metamask.selectedAddress) {
          this.setUserWallet(undefined);
        } else if (
          wallet &&
          fetchingWallet === false &&
          metamask.selectedAddress &&
          metamask.selectedAddress !== wallet.address
        ) {
          this.setState({ fetchingWallet: true });
          this.openUserWallet();
        }
      }
    };
    await accountChangeHook(handleAccountChange);
  };

  connectSocket = () => {
    const { setDiscourseUser, setGitHubUser } = this;
    const socket = io.connect(process.env.SOCKET || 'http://localhost:8080');
    socket.on('discourse', setDiscourseUser);
    socket.on('github', setGitHubUser);
    this.setState({ socket });
  };

  disconnect = provider => {
    if (typeof window !== 'undefined') {
      this.connectSocket();
      window.localStorage.removeItem(provider);
      const { state } = this;
      state[provider] = undefined;
      this.setState({ ...state });
    }
  };

  getDiscourseUser = () => {
    if (typeof window !== 'undefined') {
      const discourse = window.localStorage.getItem('discourse');
      this.setState({
        discourse: discourse ? JSON.parse(discourse) : undefined,
      });
    }
  };

  getGitHubUser = () => {
    if (typeof window !== 'undefined') {
      const github = window.localStorage.getItem('github');
      this.setState({ github: github ? JSON.parse(github) : undefined });
    }
  };

  getUserWallet = () => {
    if (typeof window !== 'undefined') {
      const wallet = window.localStorage.getItem('wallet');
      this.setState({ wallet: wallet ? JSON.parse(wallet) : undefined });
    }
  };

  openUserWallet = async () => {
    const wallet = await open();
    this.setState({ fetchingWallet: false });
    if (wallet) {
      this.setUserWallet(wallet);
    } else {
      this.setUserWallet(undefined);
    }
  };

  setDiscourseUser = discourse => {
    if (typeof window !== 'undefined') {
      if (discourse) {
        window.localStorage.setItem('discourse', JSON.stringify(discourse));
      } else {
        window.localStorage.removeItem('discourse');
      }
      this.setState({ discourse });
    }
  };

  setGitHubUser = github => {
    if (typeof window !== 'undefined') {
      if (github) {
        window.localStorage.setItem('github', JSON.stringify(github));
      } else {
        window.localStorage.removeItem('github');
      }
      this.setState({ github });
    }
  };

  setUserWallet = wallet => {
    if (typeof window !== 'undefined') {
      if (wallet) {
        window.localStorage.setItem('wallet', JSON.stringify(wallet));
      } else {
        window.localStorage.removeItem('wallet');
      }
      this.setState({ wallet });
    }
  };

  render = () => {
    const {
      page,
      intl: { formatMessage },
    } = this.props;
    const { discourse, github, wallet } = this.state;
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
            )}
          </div>
        </main>
      </>
    );
  };
}

export default injectIntl(Dashboard);
