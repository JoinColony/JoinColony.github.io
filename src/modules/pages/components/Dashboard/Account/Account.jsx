/* @flow */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import Blockies from 'react-blockies';

import styles from './Account.module.css';

type Props = {|
  active: string,
  wallet: Object,
|};

const displayName = 'pages.Dashboard.Account';

const Account = ({ wallet }: Props) => (
  <>
    <div className={styles.main}>
      <div className={styles.header}>
        <Blockies
          className={styles.blockies}
          seed={wallet.address}
          scale={12}
        />
        <div>
          <div className={styles.name}>Crypto Dave</div>
          <div className={styles.address}>{wallet.address}</div>
          <div className={styles.statistics}>
            <span>0 CLNY</span>
            <span>0 Reputation</span>
          </div>
        </div>
      </div>
    </div>
  </>
);

Account.displayName = displayName;

export default Account;
