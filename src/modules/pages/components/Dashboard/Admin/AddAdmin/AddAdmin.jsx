/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';

import React, { useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import Input from '~core/Input';

import styles from './AddAdmin.module.css';

const MSG = defineMessages({
  buttonAddAdmin: {
    id: 'pages.Dashboard.Admin.AddAdmin.buttonAddAdmin',
    defaultMessage: 'Add Admin',
  },
  labelAddress: {
    id: 'pages.Dashboard.Admin.AddAdmin.labelAddress',
    defaultMessage: 'Wallet Address',
  },
  labelUsername: {
    id: 'pages.Dashboard.Admin.AddAdmin.labelUsername',
    defaultMessage: 'GitHub Username',
  },
  success: {
    id: 'pages.Dashboard.Admin.AddAdmin.success',
    defaultMessage: 'Success! Admin added.',
  },
});

const displayName = 'pages.Contribute.AddAdmin';

type Props = {|
  colonyClient: ?ColonyClient,
|};

const server = process.env.SERVER_URL || 'http://localhost:8080';

const AddAdmin = ({ colonyClient }: Props) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState('');

  const handleAddAdmin = async () => {
    if (colonyClient && address && username) {
      await colonyClient.setRootRole.send(
        {
          address,
          domainId: 1,
          setTo: true,
        },
        {},
      );
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      };
      // eslint-disable-next-line no-undef
      fetch(`${server}/api/admin`, options)
        .then(() => {
          setSuccess(true);
        })
        .catch(fetchError => {
          setError(fetchError.message);
        });
    }
  };

  const handleChangeAddress = event => {
    if (success) setSuccess(false);
    if (error) setError(null);
    setAddress(event.currentTarget.value);
  };

  const handleChangeUsername = event => {
    if (success) setSuccess(false);
    if (error) setError(null);
    setUsername(event.currentTarget.value);
  };

  return (
    <div className={styles.main}>
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
      </div>
      <div className={styles.field}>
        <Input
          appearance={{
            padding: 'huge',
            width: 'stretch',
          }}
          id="username"
          label={MSG.labelUsername}
          onChange={handleChangeUsername}
          type="text"
          value={username}
        />
      </div>
      <div className={styles.field}>
        <Button
          appearance={{
            theme: 'primary',
            padding: 'huge',
            width: 'stretch',
          }}
          disabled={!address || !username}
          onClick={handleAddAdmin}
          text={MSG.buttonAddAdmin}
          type="submit"
        />
      </div>
      {success && (
        <div className={styles.success}>
          <FormattedMessage {...MSG.success} />
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

AddAdmin.displayName = displayName;

export default AddAdmin;
