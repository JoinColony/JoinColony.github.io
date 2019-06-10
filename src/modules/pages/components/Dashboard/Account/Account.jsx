/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import FormattedToken from '~core/FormattedToken';
import Image from '~core/Image';
import Input from '~core/Input';

import type { Provider, User } from '~types';

import Address from './Address';
import DeleteAccount from './DeleteAccount';
import Discourse from './Discourse';
import Email from './Email';
import Name from './Name';

import styles from './Account.module.css';

const MSG = defineMessages({
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

const displayName = 'pages.Dashboard.Account';

const Account = ({
  authenticate,
  disconnect,
  setUser,
  user,
  wallet,
}: Props) => {
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
          <Discourse
            authenticate={authenticate}
            disconnect={disconnect}
            user={user}
          />
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
          <DeleteAccount disconnect={disconnect} user={user} />
        </div>
      </div>
    </div>
  );
};

Account.displayName = displayName;

export default Account;
