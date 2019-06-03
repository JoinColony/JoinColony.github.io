/* @flow */

import type { IntlShape } from 'react-intl';
import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React from 'react';
import { Router } from '@reach/router';
import { defineMessages } from 'react-intl';
import { Helmet } from 'react-helmet';

import SEO from '~parts/SEO';

import Landing from './Landing';
import MetaMask from '../Dashboard/MetaMask';
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
  page: string,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Contribute';

const Contribute = ({
  colonyClient,
  intl: { formatMessage },
  page,
  wallet,
}: Props) => {
  const title = formatMessage(MSG.pageTitle);
  if (!wallet && page) {
    return <MetaMask />;
  }
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
          <Landing path="/contribute" />
          <Payment path="/contribute/payment" colonyClient={colonyClient} />
          <Task
            path="/contribute/task"
            colonyClient={colonyClient}
            wallet={wallet}
          />
        </Router>
      </main>
    </>
  );
};

Contribute.displayName = displayName;

export default Contribute;
