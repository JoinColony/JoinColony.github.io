/* @flow */

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import Input from '~core/Input';

import type { Network, User } from '~types';

import styles from './AddColony.module.css';

const MSG = defineMessages({
  labelAddress: {
    id: 'pages.Dashboard.Colonies.AddColony.labelAddress',
    defaultMessage: 'Address',
  },
  labelName: {
    id: 'pages.Dashboard.Colonies.AddColony.labelName',
    defaultMessage: 'Name',
  },
  buttonSubmit: {
    id: 'pages.Dashboard.Colonies.AddColony.buttonSubmit',
    defaultMessage: 'Add Colony',
  },
});

type Props = {|
  network: Network,
  setUser: (user: User) => void,
  setVisible: (visible: boolean) => void,
  user: User,
|};

const displayName = 'pages.Dashboard.Colonies.AddColony';

const server = process.env.SERVER_URL || 'http://localhost:8080';

const AddColony = ({ network, setUser, setVisible, user }: Props) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const handleChangeAddress = event => {
    setAddress(event.currentTarget.value);
  };
  const handleAddColony = () => {
    if (address && network) {
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
            setVisible(false);
          }
        })
        .catch(message => {
          setError(message);
        });
    }
  };
  return (
    <div className={styles.field}>
      <Input
        appearance={{
          padding: 'huge',
          width: 'large',
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
        style={{ marginLeft: '20px' }}
        onClick={handleAddColony}
        text={MSG.buttonSubmit}
        type="submit"
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

AddColony.displayName = displayName;

export default AddColony;
