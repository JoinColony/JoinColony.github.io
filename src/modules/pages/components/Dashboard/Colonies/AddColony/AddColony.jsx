/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { isAddress } from 'web3-utils';

import Button from '~core/Button';
import Input from '~core/Input';

import type { Network, User } from '~types';

import styles from './AddColony.module.css';

const MSG = defineMessages({
  labelAddress: {
    id: 'pages.Dashboard.Colonies.AddColony.labelAddress',
    defaultMessage: 'Colony Address',
  },
  submitAddress: {
    id: 'pages.Dashboard.Colonies.AddColony.submitAddress',
    defaultMessage: 'Add Colony',
  },
});

type Props = {|
  network: Network,
  networkClient: ?ColonyNetworkClient,
  setAddColony: (visible: boolean) => void,
  setUser: (user: User) => void,
  user: User,
|};

const displayName = 'pages.Dashboard.Colonies.AddColony';

const server = process.env.SERVER_URL || 'http://localhost:8080';

const AddColony = ({
  network,
  networkClient,
  setAddColony,
  setUser,
  user,
}: Props) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const handleChangeAddress = event => {
    if (error) setError(null);
    setAddress(event.currentTarget.value);
  };
  const handleAddColony = async () => {
    if (
      networkClient &&
      isAddress(address) &&
      (await networkClient.isColony.call({ colony: address }))
    ) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, network: network.slug }),
      };
      // eslint-disable-next-line no-undef
      fetch(`${server}/api/colonies?sessionID=${user.session.id}`, options)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setTimeout(() => {
              setError(null);
            }, 2000);
          } else {
            setUser({ ...user, colonies: data.colonies });
            setAddColony(false);
          }
        })
        .catch(fetchError => {
          setError(fetchError.message);
          setTimeout(() => {
            setError(null);
          }, 2000);
        });
    } else {
      setError('The address you provided is not a valid colony address');
    }
  };
  return (
    <div className={styles.field}>
      <Input
        appearance={{
          padding: 'huge',
          width: 'stretch',
        }}
        id="address"
        label={MSG.labelAddress}
        onChange={handleChangeAddress}
        type="text"
        value={address}
      />
      <Button
        appearance={{
          padding: 'large',
          theme: 'primary',
        }}
        onClick={handleAddColony}
        text={MSG.submitAddress}
        type="submit"
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

AddColony.displayName = displayName;

export default AddColony;
