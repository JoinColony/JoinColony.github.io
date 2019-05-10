/* @flow */
/* eslint-disable react/no-unused-prop-types */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useState } from 'react';
// import Blockies from 'react-blockies';
import { defineMessages, FormattedMessage } from 'react-intl';
import copy from 'copy-to-clipboard';

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
  const [copied, setCopied] = useState(false);
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
    copy(wallet.address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
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
              {copied ? (
                <div className={styles.copied}>
                  <Image
                    className={styles.copyAddress}
                    alt={MSG.copyAddress}
                    onClick={handleCopyAddress}
                    src="/img/copied.svg"
                  />
                  <FormattedMessage {...MSG.copyAddressSuccess} />
                </div>
              ) : (
                <Image
                  className={styles.copyAddress}
                  alt={MSG.copyAddress}
                  onClick={handleCopyAddress}
                  src="/img/copy.svg"
                />
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
                value={`@${github.username}`}
              />
              {github ? (
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
                <Button
                  appearance={{
                    theme: 'reset',
                    font: 'small',
                    color: 'blue',
                    weight: 'medium',
                  }}
                  onClick={
                    editEmail ? handleSaveEmail : () => setEditEmail(true)
                  }
                  style={editEmail ? { marginRight: '15px' } : {}}
                  text={
                    editEmail
                      ? MSG.connectedAccountsSave
                      : MSG.connectedAccountsEdit
                  }
                  type="submit"
                />
                {editEmail && (
                  <Button
                    appearance={{
                      theme: 'reset',
                      font: 'small',
                      color: 'grey',
                      weight: 'medium',
                    }}
                    onClick={handleCancelEmail}
                    text={MSG.connectedAccountsCancel}
                    type="submit"
                  />
                )}
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
