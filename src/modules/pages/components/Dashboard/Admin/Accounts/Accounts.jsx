/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Network, User } from '~types';

import ErrorMessage from '~core/ErrorMessage';
import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './Accounts.module.css';

const MSG = defineMessages({
  labelColoniesGoerli: {
    id: 'pages.Dashboard.Admin.AddAdmin.labelColoniesGoerli',
    defaultMessage: 'Colonies (goerli)',
  },
  labelColoniesMainnet: {
    id: 'pages.Dashboard.Admin.AddAdmin.labelColoniesMainnet',
    defaultMessage: 'Colonies (mainnet)',
  },
  labelEmail: {
    id: 'pages.Dashboard.Admin.AddAdmin.labelEmail',
    defaultMessage: 'Email',
  },
  labelDiscourse: {
    id: 'pages.Dashboard.Admin.AddAdmin.labelDiscourse',
    defaultMessage: 'Discourse',
  },
  labelGitHub: {
    id: 'pages.Dashboard.Admin.AddAdmin.labelGitHub',
    defaultMessage: 'GitHub',
  },
  labelName: {
    id: 'pages.Dashboard.Admin.AddAdmin.labelName',
    defaultMessage: 'Name',
  },
  labelWalletAddresses: {
    id: 'pages.Dashboard.Admin.AddAdmin.labelWalletAddresses',
    defaultMessage: 'Wallet Addresses',
  },
});

const displayName = 'pages.Contribute.Accounts';

type Props = {|
  network: Network,
  user: User,
  wallet: WalletObjectType,
|};

const server = process.env.SERVER_URL || 'http://localhost:8080';

const Accounts = ({ network, user, wallet }: Props) => {
  const [accounts, setAccounts] = useState(null);
  const [error, setError] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [loadedRemote, setLoadedRemote] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAccounts = useCallback(() => {
    setLoading(true);
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    // eslint-disable-next-line no-undef
    fetch(
      // eslint-disable-next-line max-len
      `${server}/api/users?sessionID=${user.session.id}&address=${wallet.address}&network=${network.slug}`,
      options,
    )
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setAccounts(null);
        } else {
          setAccounts(data.users);
        }
        setLoadedRemote(true);
      })
      .catch(err => {
        setError(err);
      });
  }, [network, user, wallet]);

  useEffect(() => {
    if (!loadedLocal) {
      const localAccounts = getStore('accounts');
      setAccounts(localAccounts);
      setLoadedLocal(true);
    }
  }, [loadedLocal]);

  useEffect(() => setStore('accounts', accounts), [accounts]);

  useEffect(() => {
    if (!loadedRemote && !loading) {
      getAccounts();
    }
  }, [getAccounts, loadedRemote, loading]);

  return (
    <div className={styles.main}>
      {accounts &&
        accounts.map(account => (
          <div className={styles.account}>
            <div>
              <strong>
                <FormattedMessage {...MSG.labelName} />{' '}
              </strong>
              {account.name}
            </div>
            <div>
              <strong>
                <FormattedMessage {...MSG.labelEmail} />{' '}
              </strong>
              {account.email}
            </div>
            <div>
              <strong>
                <FormattedMessage {...MSG.labelGitHub} />{' '}
              </strong>
              {account.github.username}
            </div>
            <div>
              <strong>
                <FormattedMessage {...MSG.labelDiscourse} />{' '}
              </strong>
              {account.discourse && account.discourse.username}
            </div>
            <div>
              <strong>
                <FormattedMessage {...MSG.labelWalletAddresses} />{' '}
              </strong>
              {account.addresses.map(address => (
                <div>{address}</div>
              ))}
            </div>
            <div>
              <strong>
                <FormattedMessage {...MSG.labelColoniesMainnet} />{' '}
              </strong>
              {account.colonies.mainnet.map(address => (
                <div>{address}</div>
              ))}
            </div>
            <div>
              <strong>
                <FormattedMessage {...MSG.labelColoniesGoerli} />{' '}
              </strong>
              {account.colonies.goerli.map(address => (
                <div>{address}</div>
              ))}
            </div>
          </div>
        ))}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

Accounts.displayName = displayName;

export default Accounts;
