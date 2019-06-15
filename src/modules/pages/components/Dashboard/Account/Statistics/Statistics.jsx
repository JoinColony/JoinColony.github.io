/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Network } from '~types';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    if (colonyClient) {
      setError(null);
      setLoading(true);
      (async () => {
        const {
          amount: balance,
        } = await colonyClient.tokenClient.getBalanceOf.call({
          sourceAddress: wallet.address,
        });
        // const { localSkillId } = await colonyClient.getDomain.call({
        //   domainId: 1,
        // });
        // const reputation = await colonyClient.getReputation({
        //   skillId: localSkillId,
        //   user: wallet.address,
        // });
        setStatistics({
          balance: balance.toString(),
          // reputation,
          reputation: 0,
        });
        setLoading(false);
      })();
    }
  }, [colonyClient, wallet]);

  if (error && !loading) {
    return <ErrorMessage error={error} />;
  }

  if (network && network.id !== 1 && network.id !== 5) {
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
          loading={loading}
          symbol="CDEV"
        />
      </div>
      <div className={styles.statistic}>
        <FormattedToken
          amount={statistics ? statistics.reputation : 0}
          appearance={{ theme: 'statistics' }}
          loading={loading}
          symbol="Reputation"
        />
      </div>
    </div>
  );
};

Statistics.displayStatistics = displayStatistics;

export default Statistics;
