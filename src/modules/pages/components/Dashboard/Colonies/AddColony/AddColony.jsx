/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { isAddress } from 'web3-utils';

import Button from '~core/Button';
import ErrorMessage from '~core/ErrorMessage';
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

const server = process.env.SERVER_URL || 'http://178.128.59.237:8000';

const AddColony = ({
  network,
  networkClient,
  setAddColony,
  setUser,
  user,
}: Props) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangeAddress = event => {
    setError(null);
    setAddress(event.currentTarget.value);
  };

  const handleAddColony = async () => {
    if (networkClient) {
      if (isAddress(address)) {
        setError(null);
        setLoading(true);
        const { isColony } = await networkClient.isColony.call({
          colony: address,
        });
        if (!isColony) {
          setError(`No colony on ${network.name} with the given address`);
          setLoading(false);
          return;
        }
        const options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, network: network.slug }),
        };
        // eslint-disable-next-line no-undef
        fetch(
          `${server}/api/user/colonies?sessionID=${user.session.id}`,
          options,
        )
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              setError(data.error);
              setLoading(false);
            } else {
              setUser({ ...user, colonies: data.colonies });
              setAddColony(false);
              setLoading(false);
            }
          })
          .catch(fetchError => {
            setError(fetchError.message);
            setLoading(false);
          });
      } else {
        setError('The address you provided is not a valid address');
      }
    } else {
      setError('Unable to initialize ColonyNetworkClient');
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleAddColony();
    }
  };

  return (
    <div className={styles.field}>
      <Input
        appearance={{
          padding: 'huge',
          size: 'stretch',
        }}
        error={error}
        id="address"
        label={MSG.labelAddress}
        onChange={handleChangeAddress}
        onKeyDown={handleKeyDown}
        type="text"
        value={address}
      />
      <Button
        appearance={{
          padding: 'large',
          theme: 'primary',
          size: 'large',
        }}
        disabled={!address}
        loading={loading}
        onClick={handleAddColony}
        text={MSG.submitAddress}
        type="submit"
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

AddColony.displayName = displayName;

export default AddColony;
