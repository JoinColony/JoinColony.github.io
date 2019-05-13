/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
// import Blockies from 'react-blockies';
import copy from 'copy-to-clipboard';

import type { User } from '~types';

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
  primaryAddress: {
    id: 'pages.Dashboard.Account.Address.primaryAddress',
    defaultMessage: `This is not your primary address. {updateAddress}.`,
  },
  updateAddress: {
    id: 'pages.Dashboard.Account.Address.updateAddress',
    defaultMessage: 'Click here to make it so',
  },
});

type Props = {|
  setUser: (user: User) => void,
  user: User,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Account.Address';

const server = process.env.SERVER_URL || 'http://localhost:8080';

const Address = ({ setUser, user, wallet }: Props) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const handleCopyAddress = useCallback(() => {
    copy(wallet.address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [wallet.address]);
  const handleUpdateAddress = () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: wallet.address }),
    };
    // eslint-disable-next-line no-undef
    fetch(`${server}/api/address?sessionID=${user.session.id}`, options)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setTimeout(() => {
            setError(null);
          }, 2000);
        } else {
          setUser({ ...user, addresses: data.addresses });
        }
      })
      .catch(message => {
        setError(message);
      });
  };
  return (
    <div className={styles.main}>
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
          <div className={styles.copyAddressSuccess}>
            <Button appearance={{ theme: 'reset' }} onClick={handleCopyAddress}>
              <Image
                className={styles.copyAddress}
                alt={MSG.copyAddress}
                src="/img/copied.svg"
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
      {!error && user.addresses[0] !== wallet.address && (
        <div className={styles.primaryAddress}>
          <FormattedMessage
            values={{
              updateAddress: (
                <Button
                  appearance={{ theme: 'reset' }}
                  onClick={handleUpdateAddress}
                  style={{ color: '#289BDC' }}
                  text={MSG.updateAddress}
                />
              ),
            }}
            {...MSG.primaryAddress}
          />
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

Address.displayName = displayName;

export default Address;
