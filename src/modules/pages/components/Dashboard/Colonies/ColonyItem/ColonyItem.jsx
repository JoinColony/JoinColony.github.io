/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Colony, Network } from '~types';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import Copy from '~core/Copy';
import Link from '~core/Link';

import styles from './ColonyItem.module.css';

const MSG = defineMessages({
  colonyAddress: {
    id: 'pages.Dashboard.Colonies.ColonyItem.colonyAddress',
    defaultMessage: 'Colony Address',
  },
  colonyLabel: {
    id: 'pages.Dashboard.Colonies.ColonyItem.colonyLabel',
    defaultMessage: 'ENS Label',
  },
  colonyTokenAddress: {
    id: 'pages.Dashboard.Colonies.ColonyItem.colonyTokenAddress',
    defaultMessage: 'Colony Token Address',
  },
  linkColonyLabel: {
    id: 'pages.Dashboard.Colonies.ColonyItem.linkColonyLabel',
    defaultMessage: 'Register',
  },
  loading: {
    id: 'pages.Dashboard.Colonies.ColonyItem.loading',
    defaultMessage: 'loading...',
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
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Colonies.ColonyItem';

const ColonyItem = ({
  colonyAddress,
  network,
  networkClient,
  wallet,
}: Props) => {
  const [colony, setColony] = useState<?Colony>(null);
  const [loadedLocal, setLoadedLocal] = useState<?boolean>(false);

  useEffect(() => {
    if (!loadedLocal) {
      const localColony = getStore(colonyAddress);
      setColony(localColony);
      setLoadedLocal(true);
    }
  }, [colonyAddress, loadedLocal]);

  useEffect(() => setStore(colonyAddress, colony), [colony, colonyAddress]);

  useEffect(() => {
    if (networkClient) {
      (async () => {
        const {
          domain: colonyLabel,
        } = await networkClient.lookupRegisteredENSDomain.call({
          ensAddress: colonyAddress,
        });
        const colonyClient = await networkClient.getColonyClientByAddress(
          colonyAddress,
        );
        const {
          address: tokenAddress,
        } = await colonyClient.getTokenAddress.call();
        setColony({
          colonyAddress,
          colonyLabel,
          tokenAddress,
        });
      })();
    }
  }, [colonyAddress, networkClient, wallet.address]);

  return (
    <div className={styles.colony}>
      {colony ? (
        <div className={styles.colonyContent}>
          <div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.colonyAddress} />
              </div>
              <div className={styles.value}>
                {colony.colonyAddress}
                <Copy copyTarget={colony.colonyAddress} />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.colonyTokenAddress} />
              </div>
              <div className={styles.value}>
                {colony.tokenAddress}
                <Copy copyTarget={colony.tokenAddress} />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.colonyLabel} />
              </div>
              <div className={styles.value}>
                {colony.colonyLabel ? (
                  colony.colonyLabel.split('.')[0]
                ) : (
                  <Link
                    arrow="right"
                    href="/colonyjs/colony-ens-labels"
                    text={MSG.linkColonyLabel}
                  />
                )}
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.network} />
              </div>
              <div className={styles.value}>{network.slug}</div>
            </div>
          </div>
        </div>
      ) : (
        <p>
          <FormattedMessage {...MSG.loading} />
        </p>
      )}
    </div>
  );
};

ColonyItem.displayName = displayName;

export default ColonyItem;
