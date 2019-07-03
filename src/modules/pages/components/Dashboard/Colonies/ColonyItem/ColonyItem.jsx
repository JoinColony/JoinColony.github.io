/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Colony, Network, User } from '~types';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import Button from '~core/Button';
import Copy from '~core/Copy';
import ErrorMessage from '~core/ErrorMessage';
import Link from '~core/Link';
import SpinnerLoader from '~core/SpinnerLoader';

import { DOCS_COLONY_JS_REGISTERING_ENS_LABELS } from '~routes';

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
  network: {
    id: 'pages.Dashboard.Colonies.ColonyItem.network',
    defaultMessage: 'Network',
  },
  removeColony: {
    id: 'pages.Dashboard.Colonies.ColonyItem.removeColony',
    defaultMessage: 'Remove',
  },
  removeColonyCancel: {
    id: 'pages.Dashboard.Colonies.ColonyItem.removeColonyCancel',
    defaultMessage: 'Cancel',
  },
  removeColonyConfirm: {
    id: 'pages.Dashboard.Colonies.ColonyItem.removeColonyConfirm',
    defaultMessage: 'Are you sure you want to remove this colony?',
  },
});

type Props = {|
  colonyAddress: string,
  network: Network,
  networkClient: ?ColonyNetworkClient,
  setUser: (user: User) => void,
  user: User,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Colonies.ColonyItem';

const server = process.env.SERVER_URL || 'http://localhost:8080';

const ColonyItem = ({
  colonyAddress,
  network,
  networkClient,
  setUser,
  user,
  wallet,
}: Props) => {
  const [actions, setActions] = useState<boolean>(false);
  const [colony, setColony] = useState<?Colony>(null);
  const [error, setError] = useState<?string>(null);
  const [loadedLocal, setLoadedLocal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [removeColony, setRemoveColony] = useState<boolean>(false);

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

  const handleHideActions = async () => {
    if (!removeColony) {
      setActions(false);
    }
  };

  const handleShowActions = async () => {
    setActions(true);
  };

  const handleCancelRemove = async () => {
    setError(null);
    setRemoveColony(false);
  };

  const handleRemoveColony = async () => {
    setError(null);
    setLoading(true);
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: colonyAddress, network: network.slug }),
    };
    // eslint-disable-next-line no-undef
    fetch(`${server}/api/user/colonies?sessionID=${user.session.id}`, options)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setRemoveColony(false);
          setLoading(false);
          setUser({ ...user, colonies: data.colonies });
        }
      })
      .catch(fetchError => {
        setError(fetchError.message);
        setLoading(false);
      });
  };

  return (
    <div
      className={error ? styles.colonyError : styles.colony}
      onMouseEnter={handleShowActions}
      onMouseLeave={handleHideActions}
    >
      {colony ? (
        <>
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
                      href={DOCS_COLONY_JS_REGISTERING_ENS_LABELS}
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
          {actions && (
            <div className={styles.removeColony}>
              {removeColony ? (
                <>
                  {loading ? (
                    <SpinnerLoader appearance={{ theme: 'primary' }} />
                  ) : (
                    <>
                      <span>
                        <FormattedMessage {...MSG.removeColonyConfirm} />
                      </span>
                      <Button
                        appearance={{ theme: 'reset' }}
                        onClick={handleRemoveColony}
                        text={MSG.removeColony}
                        type="submit"
                      />
                      <Button
                        appearance={{ theme: 'reset' }}
                        onClick={handleCancelRemove}
                        text={MSG.removeColonyCancel}
                        type="submit"
                      />
                    </>
                  )}
                </>
              ) : (
                <Button
                  appearance={{ theme: 'reset' }}
                  onClick={() => setRemoveColony(true)}
                  text={MSG.removeColony}
                  type="submit"
                />
              )}
              {error && <ErrorMessage error={error} />}
            </div>
          )}
        </>
      ) : (
        <div className={styles.loader}>
          <SpinnerLoader appearance={{ theme: 'primary' }} />
        </div>
      )}
    </div>
  );
};

ColonyItem.displayName = displayName;

export default ColonyItem;
