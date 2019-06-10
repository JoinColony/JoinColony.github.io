/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useRef, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import FormattedToken from '~core/FormattedToken';
import Image from '~core/Image';
import Input from '~core/Input';

import type { Provider, User } from '~types';

import Address from './Address';
import Email from './Email';
import Name from './Name';

import styles from './Account.module.css';

const MSG = defineMessages({
  confirmDelete: {
    id: 'pages.Dashboard.Account.confirmDelete',
    defaultMessage: 'Are you sure?',
  },
  connectedAccountsTitle: {
    id: 'pages.Dashboard.Account.connectedAccountsTitle',
    defaultMessage: 'Connected Accounts',
  },
  connectedAccountsDescription: {
    id: 'pages.Dashboard.Account.connectedAccountsDescription',
    defaultMessage: `Connect your accounts so we can verify your identity and
    reward you for your contributions.`,
  },
  connectedAccountsGitHubLabel: {
    id: 'pages.Dashboard.Account.connectedAccountsGitHubLabel',
    defaultMessage: 'GitHub',
  },
  connectedAccountsDiscourseLabel: {
    id: 'pages.Dashboard.Account.connectedAccountsDiscourseLabel',
    defaultMessage: 'Discourse',
  },
  connectedAccountsConnect: {
    id: 'pages.Dashboard.Account.connectedAccountsConnect',
    defaultMessage: 'Connect',
  },
  connectedAccountsRemove: {
    id: 'pages.Dashboard.Account.connectedAccountsRemove',
    defaultMessage: 'Remove',
  },
  deleteAccount: {
    id: 'pages.Dashboard.Account.deleteAccount',
    defaultMessage: 'Delete Account',
  },
  deleteAccountNo: {
    id: 'pages.Dashboard.Account.deleteAccountNo',
    defaultMessage: 'No',
  },
  deleteAccountYes: {
    id: 'pages.Dashboard.Account.deleteAccountYes',
    defaultMessage: 'Yes',
  },
  logout: {
    id: 'pages.Dashboard.Account.logout',
    defaultMessage: 'Logout',
  },
});

type Props = {|
  authenticate: (provider: Provider) => void,
  disconnect: (provider: Provider) => void,
  path: string,
  setUser: (user: User) => void,
  user: User,
  wallet: WalletObjectType,
|};

const server = process.env.SERVER_URL || 'http://localhost:8080';

const displayName = 'pages.Dashboard.Account';

const Account = ({
  authenticate,
  disconnect,
  setUser,
  user,
  wallet,
}: Props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState(false);
  const errorTimeout = useRef(null);

  const handleDeleteAccount = () => {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    // eslint-disable-next-line no-undef
    fetch(`${server}/api/user?sessionID=${user.session.id}`, options)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          errorTimeout.current = setTimeout(() => {
            setError(null);
          }, 2000);
        } else {
          disconnect('github');
        }
      })
      .catch(fetchError => {
        setError(fetchError.message);
        errorTimeout.current = setTimeout(() => {
          setError(null);
        }, 2000);
      });
  };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Image
          className={styles.photo}
          alt={user.github.username}
          src={user.github.photo}
        />
        <div>
          <Name setUser={setUser} user={user} />
          <Address setUser={setUser} user={user} wallet={wallet} />
          <div className={styles.statistics}>
            <div className={styles.statistic}>
              <FormattedToken
                amount={0}
                appearance={{ spacing: 'large', symbolWeight: 'bold' }}
                symbol="CDEV"
              />
            </div>
            <div className={styles.statistic}>
              <FormattedToken
                amount={0}
                appearance={{ spacing: 'large', symbolWeight: 'bold' }}
                decimals={0}
                symbol="Reputation"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentColumn}>
          <h2 className={styles.contentTitle}>
            <FormattedMessage {...MSG.connectedAccountsTitle} />
          </h2>
          <p>
            <FormattedMessage {...MSG.connectedAccountsDescription} />
          </p>
        </div>
        <div className={styles.contentColumn}>
          <div className={styles.field}>
            <Input
              disabled
              appearance={{
                padding: 'huge',
                width: 'large',
              }}
              id="github"
              label={MSG.connectedAccountsGitHubLabel}
              type="text"
              value={`@${user.github.username}`}
            />
          </div>
          <Email setUser={setUser} user={user} />
          <div className={styles.field}>
            <Input
              disabled
              appearance={{
                display: user.discourse ? undefined : 'none',
                padding: 'huge',
                width: 'large',
              }}
              id="discourse"
              label={MSG.connectedAccountsDiscourseLabel}
              type="text"
              value={user.discourse ? `@${user.discourse.username}` : ''}
            />
            {user.discourse ? (
              <Button
                appearance={{
                  theme: 'reset',
                  font: 'small',
                  color: 'blue',
                  weight: 'medium',
                }}
                onClick={() => disconnect('discourse')}
                text={MSG.connectedAccountsRemove}
                type="submit"
              />
            ) : (
              <Button
                appearance={{ theme: 'primary', padding: 'large' }}
                onClick={() => authenticate('discourse')}
                style={{ margin: '12px auto' }}
                text={MSG.connectedAccountsConnect}
                type="submit"
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.accountButtons}>
          <Button
            appearance={{
              theme: 'reset',
              font: 'small',
              color: 'blue',
              weight: 'medium',
            }}
            onClick={() => disconnect('github')}
            text={MSG.logout}
            type="submit"
          />
          {confirmDelete ? (
            <>
              <span className={styles.confirmDelete}>
                <FormattedMessage {...MSG.confirmDelete} />
              </span>
              <Button
                appearance={{
                  theme: 'reset',
                  font: 'small',
                  color: 'red',
                  weight: 'medium',
                }}
                onClick={handleDeleteAccount}
                text={MSG.deleteAccountYes}
                type="submit"
              />
              <Button
                appearance={{
                  theme: 'reset',
                  font: 'small',
                  color: 'grey',
                  weight: 'medium',
                }}
                onClick={() => setConfirmDelete(false)}
                text={MSG.deleteAccountNo}
                type="submit"
              />
            </>
          ) : (
            <Button
              appearance={{
                theme: 'reset',
                font: 'small',
                color: 'red',
                weight: 'medium',
              }}
              onClick={() => setConfirmDelete(true)}
              text={MSG.deleteAccount}
              type="submit"
            />
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

Account.displayName = displayName;

export default Account;
