/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
// import Blockies from 'react-blockies';
import copy from 'copy-to-clipboard';

import Button from '~core/Button';
import Image from '~core/Image';

import styles from './Address.module.css';

const MSG = defineMessages({
  copyAddress: {
    id: 'pages.Dashboard.Account.Address.copyAddress',
    defaultMessage: 'Copy Address',
  },
  copyAddressSuccess: {
    id: 'pages.Dashboard.Account.Address.copyAddressSuccess',
    defaultMessage: 'Copied',
  },
});

type Props = {|
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Account.Address';

const Address = ({ wallet }: Props) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const handleCopyAddress = useCallback(() => {
    copy(wallet.address);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  }, [wallet.address]);
  return (
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
          <Button appearance={{ theme: 'reset' }} onClick={handleCopyAddress}>
            <Image
              className={styles.copyAddress}
              alt={MSG.copyAddress}
              src="/img/copySuccess.svg"
            />
            <FormattedMessage {...MSG.copyAddressSuccess} />
          </Button>
        </div>
      ) : (
        <Button appearance={{ theme: 'reset' }} onClick={handleCopyAddress}>
          <Image
            className={styles.copyAddress}
            alt={MSG.copyAddress}
            src="/img/copy.svg"
          />
        </Button>
      )}
    </div>
  );
};

Address.displayName = displayName;

export default Address;
