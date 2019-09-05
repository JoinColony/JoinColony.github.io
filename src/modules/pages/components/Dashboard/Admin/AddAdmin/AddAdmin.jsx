/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';

import React, { useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import ErrorMessage from '~core/ErrorMessage';
import Input from '~core/Input';

import styles from './AddAdmin.module.css';

const MSG = defineMessages({
  buttonAddAdmin: {
    id: 'pages.Dashboard.Admin.AddAdmin.buttonAddAdmin',
    defaultMessage: 'Add Admin',
  },
  labelAddress: {
    id: 'pages.Dashboard.Admin.AddAdmin.labelAddress',
    defaultMessage: 'Ethereum Address',
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
  root: boolean,
|};

const AddAdmin = ({ colonyClient, root }: Props) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddAdmin = async () => {
    if (colonyClient && address) {
      await colonyClient.setAdministrationRole.send(
        {
          address,
          domainId: 1,
          setTo: true,
        },
        {},
      );
    }
  };

  const handleChangeAddress = event => {
    if (success) setSuccess(false);
    if (error) setError(null);
    setAddress(event.currentTarget.value);
  };

  return (
    <div className={styles.main}>
      <div className={styles.field}>
        <Input
          appearance={{
            padding: 'huge',
            size: 'stretch',
          }}
          id="address"
          label={MSG.labelAddress}
          onChange={handleChangeAddress}
          type="text"
          value={address}
        />
      </div>
      <div className={styles.field}>
        <Button
          appearance={{
            theme: 'primary',
            padding: 'huge',
            size: 'stretch',
          }}
          disabled={!address || !root}
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
      {error && <ErrorMessage error={error} />}
      {!root && <ErrorMessage error="You are not authorized to add admin" />}
    </div>
  );
};

AddAdmin.displayName = displayName;

export default AddAdmin;
