/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Network } from '~types';

import { supportedNetwork } from '~layouts/DeveloperPortalLayout/helpers';

import ErrorMessage from '~core/ErrorMessage';
import FormattedToken from '~core/FormattedToken';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

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
  const [loadedLocal, setLoadedLocal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [statistics, setStatistics] = useState(null);

  const getStatistics = useCallback(async () => {
    if (colonyClient) {
      setLoading(true);
      try {
        const {
          amount: tokens,
        } = await colonyClient.tokenClient.getBalanceOf.call({
          sourceAddress: wallet.address,
        });
        const { skillId } = await colonyClient.getDomain.call({
          domainId: 1,
        });
        const {
          reputationAmount: reputation,
        } = await colonyClient.getReputation({
          skillId,
          address: wallet.address,
        });
        setStatistics({
          tokens,
          reputation,
        });
        setLoaded(true);
        setLoading(false);
      } catch (clientError) {
        setError(clientError.message);
        setStatistics(null);
        setLoading(false);
      }
    }
  }, [colonyClient, wallet]);

  useEffect(() => {
    if (!loadedLocal) {
      const localStatistics = getStore(`${wallet.address}-${network.id}`);
      setStatistics(localStatistics);
      setLoadedLocal(true);
    }
  }, [loadedLocal, network, wallet]);

  useEffect(
    () =>
      setStore(
        `${wallet.address}-${network.id}`,
        statistics
          ? {
              tokens: statistics.tokens.toString(),
              reputation: statistics.reputation,
            }
          : null,
      ),
    [network, statistics, wallet],
  );

  useEffect(() => {
    if (colonyClient && !error && !loaded && !loading) {
      getStatistics();
    }
  }, [colonyClient, error, getStatistics, loaded, loading]);

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
          amount={statistics ? statistics.tokens : 0}
          appearance={{ theme: 'statistics' }}
          loading={loading && !statistics}
          symbol="CDEV"
        />
      </div>
      <div className={styles.statistic}>
        <FormattedToken
          amount={statistics ? statistics.reputation : 0}
          appearance={{ theme: 'statistics' }}
          loading={loading && !statistics}
          symbol="Reputation"
        />
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

Statistics.displayStatistics = displayStatistics;

export default Statistics;
