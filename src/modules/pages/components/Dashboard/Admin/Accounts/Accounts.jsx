/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useCallback, useEffect, useState } from 'react';

import type { Network, User } from '~types';

import ErrorMessage from '~core/ErrorMessage';
import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './Accounts.module.css';

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
      <table className={styles.accounts}>
        <thead>
          <tr>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {accounts &&
            accounts.map(account => (
              <tr>
                <td>{account.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

Accounts.displayName = displayName;

export default Accounts;
