/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useEffect, useState } from 'react';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import FormattedToken from '~core/FormattedToken';
import SpinnerLoader from '~core/SpinnerLoader';

import styles from './Statistics.module.css';

type Props = {|
  colonyClient: ?ColonyClient,
  wallet: WalletObjectType,
|};

const displayStatistics = 'pages.Dashboard.Account.Statistics';

const Statistics = ({ colonyClient, wallet }: Props) => {
  const [statistics, setStatistics] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState<boolean>(false);

  useEffect(() => {
    if (!loadedLocal) {
      const localStatistics = getStore(wallet.address);
      setStatistics(localStatistics);
      setLoadedLocal(true);
    }
  }, [loadedLocal, wallet]);

  useEffect(() => setStore(wallet.address, statistics), [statistics, wallet]);

  useEffect(() => {
    if (colonyClient) {
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
        });
      })();
    }
  }, [colonyClient, wallet]);

  if (!statistics) {
    return <SpinnerLoader />;
  }

  return (
    <div className={styles.statistics}>
      <div className={styles.statistic}>
        <FormattedToken
          amount={statistics.balance || 0}
          appearance={{ spacing: 'medium', symbolWeight: 'bold' }}
          symbol="CDEV"
        />
      </div>
      <div className={styles.statistic}>
        <FormattedToken
          amount={statistics.reputation || 0}
          appearance={{ spacing: 'medium', symbolWeight: 'bold' }}
          symbol="Reputation"
        />
      </div>
    </div>
  );
};

Statistics.displayStatistics = displayStatistics;

export default Statistics;
