/* @flow */
import type { IntlShape } from 'react-intl';

import React, { cloneElement, Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { open } from '@colony/purser-metamask';

import SEO from '~parts/SEO';
import Sidebar from './Sidebar';

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
  content: Object,
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
      content,
      intl: { formatMessage },
    } = this.props;
    const { active } = content.props;
    const { wallet, github } = this.state;
    const title = formatMessage(MSG.pageTitle);

    if (!wallet) {
      return <MetaMask />;
    }
    if (wallet && !github) {
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
              <Sidebar active={active} />
            </div>
            <main className={styles.content}>
              {cloneElement(content, { wallet, github })}
            </main>
          </div>
        </main>
      </>
    );
  }
}

export default injectIntl(Dashboard);
