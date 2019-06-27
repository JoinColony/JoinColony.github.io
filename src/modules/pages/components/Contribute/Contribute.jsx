/* @flow */

import type { IntlShape } from 'react-intl';
import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React from 'react';
import { Router } from '@reach/router';
import { defineMessages } from 'react-intl';
import { Helmet } from 'react-helmet';

import type { Network, User } from '~types';

import SEO from '~parts/SEO';

import { PAGE_DEVELOPER_PORTAL_CONTRIBUTE } from '~routes';

import Landing from './Landing';
import Payment from './Payment';
import Task from './Task';

import styles from './Contribute.module.css';

const MSG = defineMessages({
  pageDescription: {
    id: 'pages.Contribute.pageDescription',
    defaultMessage: `A list of open issues that developers can work on to earn
    tokens and reputation.`,
  },
  pageTitle: {
    id: 'pages.Contribute.pageTitle',
    defaultMessage: 'Contribute',
  },
});

type Props = {|
  colonyClient: ColonyClient,
  intl: IntlShape,
  network: Network,
  /* eslint-disable-next-line react/no-unused-prop-types */
  page: string,
  user: User,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Contribute';

const Contribute = ({
  colonyClient,
  intl: { formatMessage },
  network,
  user,
  wallet,
}: Props) => {
  const title = formatMessage(MSG.pageTitle);
  return (
    <>
      <SEO description={MSG.pageDescription} title={title} />
      {/*
        Helmet title must be a prop to work with react hooks.
        See https://github.com/nfl/react-helmet/issues/437
      */}
      <Helmet title={title} />
      <main className={styles.main}>
        <Router primary={false}>
          <Landing
            path={PAGE_DEVELOPER_PORTAL_CONTRIBUTE}
            network={network}
            user={user}
          />
          {/* TODO Update to modal. No need to use route constant here becuase
            payment will soon be a modal */}
          <Payment
            path="/contribute/payment"
            colonyClient={colonyClient}
            network={network}
            wallet={wallet}
          />
          {/* TODO Update to modal. No need to use route constant here becuase
            payment will soon be a modal */}
          <Task
            path="/contribute/task"
            colonyClient={colonyClient}
            network={network}
            wallet={wallet}
          />
        </Router>
      </main>
    </>
  );
};

Contribute.displayName = displayName;

export default Contribute;
