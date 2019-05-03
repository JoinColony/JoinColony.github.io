/* @flow */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import Blockies from 'react-blockies';

import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import Image from '~core/Image';

import styles from './Account.module.css';

const MSG = defineMessages({
  disconnectGitHub: {
    id: 'pages.Dashboard.Account.disconnectGitHub',
    defaultMessage: 'Disconnect GitHub',
  },
});

type Props = {|
  disconnectGitHub: any,
  github: Object,
  path: string,
  wallet: Object,
|};

const displayName = 'pages.Dashboard.Account';

const Account = ({ disconnectGitHub, github, wallet }: Props) => (
  <>
    <div className={styles.main}>
      <div className={styles.header}>
        <Image className={styles.photo} alt={github.name} src={github.photo} />
        <div>
          <div className={styles.name}>{github.name}</div>
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
        <Button
          appearance={{ theme: 'primaryHollow' }}
          onClick={disconnectGitHub}
          text={MSG.disconnectGitHub}
          type="submit"
        />
      </div>
    </div>
  </>
);

Account.displayName = displayName;

export default Account;
