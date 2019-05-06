/* @flow */
/* eslint-disable react/no-unused-prop-types */

import type { WalletObjectType } from '@colony/purser-core';

import React from 'react';
import Blockies from 'react-blockies';

import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import Image from '~core/Image';
import Input from '~core/Input';

import type { Discourse, GitHub } from '../types';

import styles from './Account.module.css';

const MSG = defineMessages({
  authenticateDiscourse: {
    id: 'pages.Dashboard.Account.authenticateDiscourse',
    defaultMessage: 'Authenticate Discourse',
  },
  disconnectDiscourse: {
    id: 'pages.Dashboard.Account.disconnectDiscourse',
    defaultMessage: 'Disconnect Discourse',
  },
  disconnectGitHub: {
    id: 'pages.Dashboard.Account.disconnectGitHub',
    defaultMessage: 'Disconnect GitHub',
  },
});

type Props = {|
  authenticate: string => void,
  disconnect: string => void,
  discourse?: Discourse,
  github: GitHub,
  path: string,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Account';

const Account = ({
  authenticate,
  disconnect,
  discourse,
  github,
  wallet,
}: Props) => (
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
            <Blockies
              className={styles.blockies}
              seed={wallet.address}
              scale={3}
            />
            {wallet.address}
          </div>
          <div className={styles.statistics}>
            <span>0 CLNY</span>
            <span>0 Reputation</span>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.contentTitle}>Connected Accounts</h2>
        <div>
          <Input
            disabled
            appearance={{ padding: 'huge' }}
            id="github"
            type="text"
            value={github.username}
          />
          <Button
            appearance={{ theme: 'primaryHollow', padding: 'huge' }}
            onClick={() => disconnect('github')}
            text={MSG.disconnectGitHub}
            type="submit"
          />
        </div>
        <div>
          {discourse ? (
            <div>
              <Input
                disabled
                appearance={{ padding: 'huge' }}
                id="discourse"
                type="text"
                value={discourse.username}
              />
              <Button
                appearance={{ theme: 'primaryHollow', padding: 'huge' }}
                onClick={() => disconnect('discourse')}
                text={MSG.disconnectDiscourse}
                type="submit"
              />
            </div>
          ) : (
            <Button
              appearance={{ theme: 'primary', padding: 'huge' }}
              onClick={() => authenticate('discourse')}
              text={MSG.authenticateDiscourse}
              type="submit"
            />
          )}
        </div>
      </div>
    </div>
  </>
);

Account.displayName = displayName;

export default Account;
