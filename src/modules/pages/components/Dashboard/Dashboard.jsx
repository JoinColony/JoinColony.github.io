/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages } from 'react-intl';
import { Helmet } from 'react-helmet';

import SEO from '~parts/SEO';

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

type Props = {|
  /** Injected via `injectIntl` */
  intl: IntlShape,
|};

const displayName = 'pages.Dashboard';

const Dashboard = ({ intl: { formatMessage } }: Props) => {
  const title = formatMessage(MSG.pageTitle);
  return (
    <>
      <SEO description={MSG.pageDescription} title={title} />
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className={styles.main}>
        <MetaMask />
      </main>
    </>
  );
};

Dashboard.displayName = displayName;

export default Dashboard;
