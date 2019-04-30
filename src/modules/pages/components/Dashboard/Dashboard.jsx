/* @flow */

import type { IntlShape } from 'react-intl';

import React, { Component } from 'react';
import { Redirect, Router } from '@reach/router';
import { defineMessages, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { open } from '@colony/purser-metamask';

import SEO from '~parts/SEO';
import Sidebar from './Sidebar';

import Account from './Account';
import Colonies from './Colonies';
import Contributions from './Contributions';

import Login from './Login';
import MetaMask from './MetaMask';

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
  active: string,
  intl: IntlShape,
|};

type State = {
  github: any,
  wallet: Object,
};

class Dashboard extends Component<Props, State> {
  static displayName = 'pages.Dashboard';

  constructor(props) {
    super(props);
    this.state = {
      github: null,
      wallet: null,
    };
  }

  async componentDidMount() {
    const wallet = await open();
    this.setState({ wallet });
  }

  authenticate = () => {
    // TODO: GitHub authentication
    this.setState({ github: true });
  };

  render() {
    const {
      active,
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
    if (!active) {
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
              <Sidebar active={active} />
            </div>
            <main className={styles.content}>
              <Router primary={false}>
                <Account path="/dashboard/account" wallet={wallet} />
                <Colonies path="/dashboard/colonies" wallet={wallet} />
                <Contributions
                  path="/dashboard/contributions"
                  wallet={wallet}
                />
              </Router>
            </main>
          </div>
        </main>
      </>
    );
  }
}

export default injectIntl(Dashboard);
