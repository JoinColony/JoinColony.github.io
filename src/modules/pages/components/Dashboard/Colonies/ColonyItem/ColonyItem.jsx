/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Network } from '~types';

import styles from './ColonyItem.module.css';

const MSG = defineMessages({
  colonyAddress: {
    id: 'pages.Dashboard.Colonies.ColonyItem.colonyAddress',
    defaultMessage: 'Colony Address',
  },
  colonyTokenAddress: {
    id: 'pages.Dashboard.Colonies.ColonyItem.colonyTokenAddress',
    defaultMessage: 'Colony Token Address',
  },
  network: {
    id: 'pages.Dashboard.Colonies.ColonyItem.network',
    defaultMessage: 'Network',
  },
});

type Props = {|
  colonyAddress: string,
  network: Network,
  networkClient: ?ColonyNetworkClient,
|};

const displayName = 'pages.Dashboard.Colonies.ColonyItem';

const ColonyItem = ({ colonyAddress, network, networkClient }: Props) => {
  const [colony, setColony] = useState(null);

  useEffect(() => {
    if (networkClient) {
      (async () => {
        const colonyClient = await networkClient.getColonyClientByAddress(
          colonyAddress,
        );
        const {
          address: tokenAddress,
        } = await colonyClient.getTokenAddress.call();
        setColony({
          colonyAddress,
          tokenAddress,
        });
      })();
    }
  }, [colonyAddress, networkClient]);

  return (
    <div className={styles.colony}>
      {colony ? (
        <div className={styles.colonyContent}>
          <div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.colonyAddress} />
              </div>
              <div className={styles.value}>{colony.colonyAddress}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.colonyTokenAddress} />
              </div>
              <div className={styles.value}>{colony.tokenAddress}</div>
            </div>
          </div>
          <div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.network} />
              </div>
              <div className={styles.value}>{network.slug}</div>
            </div>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

ColonyItem.displayName = displayName;

export default ColonyItem;
