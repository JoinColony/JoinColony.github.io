/* @flow */
/* eslint-disable react/no-unused-prop-types */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
// import Blockies from 'react-blockies';
import copy from 'copy-to-clipboard';

import Button from '~core/Button';
import Image from '~core/Image';
import Input from '~core/Input';

import type { Provider, User } from '~types';

import EmailInput from './EmailInput';
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
  connectedAccountsDiscourseLabel: {
    id: 'pages.Dashboard.Account.connectedAccountsDiscourseLabel',
    defaultMessage: 'Discourse',
  },
  connectedAccountsCancel: {
    id: 'pages.Dashboard.Account.connectedAccountsCancel',
    defaultMessage: 'Cancel',
  },
  connectedAccountsConnect: {
    id: 'pages.Dashboard.Account.connectedAccountsConnect',
    defaultMessage: 'Connect',
  },
  connectedAccountsEdit: {
    id: 'pages.Dashboard.Account.connectedAccountsEdit',
    defaultMessage: 'Edit',
  },
  connectedAccountsRemove: {
    id: 'pages.Dashboard.Account.connectedAccountsRemove',
    defaultMessage: 'Remove',
  },
  connectedAccountsSave: {
    id: 'pages.Dashboard.Account.connectedAccountsSave',
    defaultMessage: 'Save',
  },
  copyAddress: {
    id: 'pages.Dashboard.Account.copyAddress',
    defaultMessage: 'Copy Address',
  },
  copyAddressSuccess: {
    id: 'pages.Dashboard.Account.copyAddressSuccess',
    defaultMessage: 'Copied',
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
  const [copySuccess, setCopySuccess] = useState(false);
  const handleCopyAddress = useCallback(() => {
    copy(wallet.address);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  }, [wallet.address]);
  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <Image
            className={styles.photo}
            alt={user.github.name || user.github.username}
            src={user.github.photo}
          />
          <div>
            <div className={styles.name}>
              {user.github.name || user.github.username}
            </div>
            <div className={styles.address}>
              {/*
              <Blockies
                className={styles.blockies}
                seed={wallet.address}
                scale={2.5}
              />
              */}
              {wallet.address}
              {copySuccess ? (
                <div className={styles.copyAddressSuccess}>
                  <Button
                    appearance={{ theme: 'reset' }}
                    onClick={handleCopyAddress}
                  >
                    <Image
                      className={styles.copyAddress}
                      alt={MSG.copyAddress}
                      src="/img/copySuccess.svg"
                    />
                    <FormattedMessage {...MSG.copyAddressSuccess} />
                  </Button>
                </div>
              ) : (
                <Button
                  appearance={{ theme: 'reset' }}
                  onClick={handleCopyAddress}
                >
                  <Image
                    className={styles.copyAddress}
                    alt={MSG.copyAddress}
                    src="/img/copy.svg"
                  />
                </Button>
              )}
            </div>
            <div className={styles.statistics}>
              <div className={styles.statistic}>
                <span className={styles.statisticValue}>0</span>
                <span className={styles.statisticLabel}>CLNY</span>
              </div>
              <div className={styles.statistic}>
                <span className={styles.statisticValue}>0</span>
                <span className={styles.statisticLabel}>Reputation</span>
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
              <Button
                appearance={{
                  theme: 'reset',
                  font: 'small',
                  color: 'blue',
                  weight: 'medium',
                }}
                onClick={() => disconnect('github')}
                text={MSG.connectedAccountsRemove}
                type="submit"
              />
            </div>
            <EmailInput setUser={setUser} user={user} />
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
      </div>
    </>
  );
};

Account.displayName = displayName;

export default Account;
