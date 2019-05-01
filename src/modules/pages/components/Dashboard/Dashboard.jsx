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
import Loading from './Loading';
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

const API = 'http://localhost:8080';
const socket = io(API);

export type Props = {|
  page: string,
  intl: IntlShape,
|};

type State = {
  loading: boolean,
  github: any,
  wallet: Object,
};

class Dashboard extends Component<Props, State> {
  static displayName = 'pages.Dashboard';

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      github: null,
      wallet: null,
    };
  }

  async componentDidMount() {
    if (typeof window !== 'undefined') {
      const github = JSON.parse(window.localStorage.getItem('github'));
      const wallet = await open();
      this.setState({ loading: false, github, wallet });
      socket.on('github', response => {
        window.localStorage.setItem('github', JSON.stringify(response));
        this.setState({ github: response });
      });
    }
  }

  componentWillUnmount() {
    socket.off('github');
  }

  authenticate = () => {
    const url = `${API}/github?socketId=${socket.id}`;
    if (typeof window !== 'undefined') {
      window.open(url);
    }
  };

  render = () => {
    const {
      page,
      intl: { formatMessage },
    } = this.props;
    const { loading, wallet, github } = this.state;
    const title = formatMessage(MSG.pageTitle);

    if (typeof window !== 'undefined' && page === 'close') {
      window.close();
    }
    if (loading) {
      return <Loading />;
    }
    if (!wallet) {
      return <MetaMask />;
    }
    if (wallet && !github) {
      return <Login wallet={wallet} authenticate={this.authenticate} />;
    }
    if (!page) {
      return <Redirect to="/dashboard/account" noThrow />;
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
