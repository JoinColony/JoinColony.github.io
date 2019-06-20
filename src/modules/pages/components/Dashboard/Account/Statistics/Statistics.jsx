/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Network } from '~types';

import { supportedNetwork } from '~layouts/DeveloperPortalLayout/helpers';

import ErrorMessage from '~core/ErrorMessage';
import FormattedToken from '~core/FormattedToken';

import styles from './Statistics.module.css';

const MSG = defineMessages({
  statisticsSwitchNetwork: {
    id: 'pages.Dashboard.Account.statisticsSwitchNetwork',
    defaultMessage: 'Switch networks to see your token balance and reputation.',
  },
});

type Props = {|
  colonyClient: ?ColonyClient,
  network: Network,
  wallet: WalletObjectType,
|};

const displayStatistics = 'pages.Dashboard.Account.Statistics';

const Statistics = ({ colonyClient, network, wallet }: Props) => {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [statistics, setStatistics] = useState(null);

  const getStatistics = useCallback(async () => {
    if (colonyClient) {
      setError(null);
      setLoading(true);
      const {
        amount: balance,
      } = await colonyClient.tokenClient.getBalanceOf.call({
        sourceAddress: wallet.address,
      });
      const { skillId } = await colonyClient.getDomain.call({
        domainId: 1,
      });
      const { reputationAmount } = await colonyClient.getReputation({
        skillId,
        address: wallet.address,
      });
      setStatistics({
        balance: balance.toString(),
        reputation: reputationAmount || 0,
      });
      setLoaded(true);
      setLoading(false);
    }
  }, [colonyClient, wallet]);

  useEffect(() => {
    if (colonyClient && !loaded && !statistics) {
      getStatistics();
    }
  }, [colonyClient, getStatistics, loaded, statistics]);

  useEffect(() => {
    if (!colonyClient && loaded) {
      setLoaded(false);
      setStatistics(null);
    }
  }, [colonyClient, loaded, statistics]);

  if (error && !loading) {
    return <ErrorMessage error={error} />;
  }

  if (!supportedNetwork(network)) {
    return (
      <div className={styles.statisticsSwitchNetwork}>
        <FormattedMessage {...MSG.statisticsSwitchNetwork} />
      </div>
    );
  }

  return (
    <div className={styles.statistics}>
      <div className={styles.statistic}>
        <FormattedToken
          amount={statistics ? statistics.balance : 0}
          appearance={{ theme: 'statistics' }}
          loading={loading || !loaded}
          symbol="CDEV"
        />
      </div>
      <div className={styles.statistic}>
        <FormattedToken
          amount={statistics ? statistics.reputation : 0}
          appearance={{ theme: 'statistics' }}
          loading={loading || !loaded}
          symbol="Reputation"
        />
      </div>
    </div>
  );
};

Statistics.displayStatistics = displayStatistics;

export default Statistics;
