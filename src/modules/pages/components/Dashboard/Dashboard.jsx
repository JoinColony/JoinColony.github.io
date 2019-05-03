/* @flow */

import type { IntlShape } from 'react-intl';

import React, { Component } from 'react';
import { Redirect, Router } from '@reach/router';
import { defineMessages, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { open } from '@colony/purser-metamask';
import io from 'socket.io-client';

import SEO from '~parts/SEO';

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
  github: Object,
  socket: Object,
  wallet: Object,
};

class Dashboard extends Component<Props, State> {
  static displayName = 'pages.Dashboard';

  constructor(props) {
    super(props);
    this.state = {
      github: null,
      socket: null,
      wallet: null,
    };
  }

  async componentDidMount() {
    const wallet = await open();
    const github = this.getGitHubUser();
    if (!github) this.connectSocket();
    this.setState({ github, wallet });
  }

  componentWillUnmount() {
    const { socket } = this.state;
    if (socket) {
      socket.off('github');
      socket.disconnect();
    }
  }

  authenticate = () => {
    const { socket } = this.state;
    const api = process.env.API_URL || 'http://localhost:8080';
    const url = `${api}/auth/github?socketId=${socket.id}`;
    if (typeof window !== 'undefined') window.open(url);
  };

  connectSocket = () => {
    const { setGitHubUser } = this;
    const socket = io.connect(process.env.SOCKET || 'http://localhost:8080');
    socket.on('github', response => setGitHubUser(response));
    this.setState({ socket });
  };

  disconnectGitHub = () => {
    if (typeof window !== 'undefined') {
      this.connectSocket();
      window.localStorage.removeItem('github');
      this.setState({ github: null });
    }
  };

  getGitHubUser = () => {
    if (typeof window !== 'undefined') {
      const github = window.localStorage.getItem('github');
      return JSON.parse(github);
    }
    return null;
  };

  setGitHubUser = github => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('github', JSON.stringify(github));
      this.setState({ github });
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
    if (!page) {
      return <Redirect to="/dashboard/account" noThrow />;
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
            <main className={styles.content}>
              <Router primary={false}>
                <Account
                  path="/dashboard/account"
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
          </div>
        </main>
      </>
    );
  };
}

export default injectIntl(Dashboard);
