/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
// import Blockies from 'react-blockies';

import type { User } from '~types';

import Button from '~core/Button';
import Copy from '~core/Copy';
import ErrorMessage from '~core/ErrorMessage';
import SpinnerLoader from '~core/SpinnerLoader';

import styles from './Address.module.css';

const MSG = defineMessages({
  primaryAddress: {
    id: 'pages.Dashboard.Account.Address.primaryAddress',
    defaultMessage: `Primary Address: {primaryAddress}`,
  },
  primaryAddressWarning: {
    id: 'pages.Dashboard.Account.Address.primaryAddressWarning',
    defaultMessage: `The above address is not your primary address.
    {updateAddress}.`,
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateAddress = () => {
    setError(null);
    setLoading(true);
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: wallet.address }),
    };
    // eslint-disable-next-line no-undef
    fetch(`${server}/api/user/address?sessionID=${user.session.id}`, options)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setUser({ ...user, addresses: data.addresses });
          setLoading(false);
        }
      })
      .catch(fetchError => {
        setError(fetchError.message);
        setLoading(false);
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
        <Copy copyTarget={wallet.address} />
      </div>
      {user.addresses[0] !== wallet.address && (
        <div className={styles.primaryAddress}>
          <div>
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
              {...MSG.primaryAddressWarning}
            />
            {loading && (
              <div className={styles.loader}>
                <SpinnerLoader appearance={{ theme: 'primary' }} />
              </div>
            )}
          </div>
          <div>
            <FormattedMessage
              values={{ primaryAddress: user.addresses[0] }}
              {...MSG.primaryAddress}
            />
          </div>
        </div>
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

Address.displayName = displayName;

export default Address;
