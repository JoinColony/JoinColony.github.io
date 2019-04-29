/* @flow */
import type { IntlShape } from 'react-intl';

import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { open } from '@colony/purser-metamask';

import SEO from '~parts/SEO';

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
  intl: IntlShape,
|};

type State = {
  wallet: Object,
};

class Dashboard extends Component<Props, State> {
  static displayName = 'pages.Dashboard';

  constructor(props) {
    super(props);
    this.state = {
      wallet: null,
    };
  }

  async componentDidMount() {
    const wallet = await open();
    this.setState({ wallet });
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    const { wallet } = this.state;
    const title = formatMessage(MSG.pageTitle);
    return (
      <>
        <SEO description={MSG.pageDescription} title={title} />
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <main className={styles.main}>
          {wallet ? <Login wallet={wallet} /> : <MetaMask />}
        </main>
      </>
    );
  }
}

export default injectIntl(Dashboard);
