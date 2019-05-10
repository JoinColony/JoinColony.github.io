/* @flow */
/* eslint-disable react/no-unused-prop-types */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useState } from 'react';
// import Blockies from 'react-blockies';

import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import Image from '~core/Image';
import Input from '~core/Input';

import type { Email, Discourse, GitHub, Provider } from '~types';

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
  connectedAccountsEmailLabel: {
    id: 'pages.Dashboard.Account.connectedAccountsEmailLabel',
    defaultMessage: 'Email',
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
    defaultMessage: 'copy address',
  },
});

type Props = {|
  authenticate: (provider: Provider) => void,
  disconnect: (provider: Provider) => void,
  discourse: ?Discourse,
  email: ?Email,
  github: GitHub,
  path: string,
  setEmail: (email: Email) => void,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Account';

const Account = ({
  authenticate,
  disconnect,
  discourse,
  email,
  github,
  setEmail,
  wallet,
}: Props) => {
  const initialEmail =
    (email ? email.email : null) ||
    github.email ||
    (discourse ? discourse.email : null);
  const [editEmail, setEditEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(initialEmail);
  const handleCancelEmail = () => {
    setEmailInput(initialEmail);
    setEditEmail(false);
  };
  const handleChangeEmail = event => {
    setEmailInput(event.target.value);
  };
  const handleSaveEmail = () => {
    if (emailInput) {
      setEmail({ email: emailInput });
      setEditEmail(false);
    }
  };
  const handleCopyAddress = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(wallet.address);
    }
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <Image
            className={styles.photo}
            alt={github.name || github.username}
            src={github.photo}
          />
          <div>
            <div className={styles.name}>{github.name || github.username}</div>
            <div className={styles.address}>
              {/*
              <Blockies
                className={styles.blockies}
                seed={wallet.address}
                scale={2.5}
              />
              */}
              {wallet.address}
              <Image
                className={styles.copyAddress}
                alt={MSG.copyAddress}
                onClick={handleCopyAddress}
                src="/img/copy.svg"
              />
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
                value={`@${github.username}`}
              />
              {github ? (
                <Button
                  appearance={{ theme: 'reset', color: 'blue', weight: 'bold' }}
                  onClick={() => disconnect('github')}
                  text={MSG.connectedAccountsRemove}
                  type="submit"
                />
              ) : (
                <Button
                  appearance={{ theme: 'primary', padding: 'large' }}
                  onClick={() => authenticate('github')}
                  style={{ margin: '12px auto' }}
                  text={MSG.connectedAccountsConnect}
                  type="submit"
                />
              )}
            </div>
            {initialEmail && (
              <div className={styles.field}>
                <Input
                  disabled={!editEmail}
                  appearance={{
                    padding: 'huge',
                    width: 'large',
                  }}
                  id="email"
                  label={MSG.connectedAccountsEmailLabel}
                  onChange={handleChangeEmail}
                  type="text"
                  value={emailInput}
                />
                {editEmail && (
                  <Button
                    appearance={{
                      theme: 'reset',
                      color: 'blue',
                      weight: 'bold',
                    }}
                    onClick={handleSaveEmail}
                    style={{ marginRight: '15px' }}
                    text={MSG.connectedAccountsSave}
                    type="submit"
                  />
                )}
                <Button
                  appearance={{ theme: 'reset', color: 'blue', weight: 'bold' }}
                  onClick={
                    editEmail ? handleCancelEmail : () => setEditEmail(true)
                  }
                  text={
                    editEmail
                      ? MSG.connectedAccountsCancel
                      : MSG.connectedAccountsEdit
                  }
                  type="submit"
                />
              </div>
            )}
            <div className={styles.field}>
              <Input
                disabled
                appearance={{
                  display: discourse ? undefined : 'none',
                  padding: 'huge',
                  width: 'large',
                }}
                id="discourse"
                label={MSG.connectedAccountsDiscourseLabel}
                type="text"
                value={discourse ? `@${discourse.username}` : ''}
              />
              {discourse ? (
                <Button
                  appearance={{ theme: 'reset', color: 'blue', weight: 'bold' }}
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
