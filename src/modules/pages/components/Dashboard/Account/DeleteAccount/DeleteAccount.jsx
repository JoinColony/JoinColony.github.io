/* @flow */

import React, { useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Provider, User } from '~types';

import Button from '~core/Button';
import ErrorMessage from '~core/ErrorMessage';
import SpinnerLoader from '~core/SpinnerLoader';

import styles from './DeleteAccount.module.css';

const MSG = defineMessages({
  deleteAccount: {
    id: 'pages.Dashboard.Account.deleteAccount',
    defaultMessage: 'Delete Account',
  },
  deleteAccountConfirm: {
    id: 'pages.Dashboard.Account.deleteAccountConfirm',
    defaultMessage: 'Are you sure you want to delete your account?',
  },
  deleteAccountCancel: {
    id: 'pages.Dashboard.Account.deleteAccountCancel',
    defaultMessage: 'Cancel',
  },
  deleteAccountDelete: {
    id: 'pages.Dashboard.Account.deleteAccountDelete',
    defaultMessage: 'Delete',
  },
});

type Props = {|
  disconnect: (provider: Provider) => void,
  user: User,
|};

const displayName = 'pages.Dashboard.Account.DeleteAccount';

const server = process.env.SERVER_URL || 'https://chora.io';

const DeleteAccount = ({ disconnect, user }: Props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = () => {
    setError(null);
    setLoading(true);
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    // eslint-disable-next-line no-undef
    fetch(`${server}/api/user?sessionID=${user.session.id}`, options)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          disconnect('github');
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
      {confirmDelete ? (
        <>
          <span className={styles.confirmDelete}>
            <FormattedMessage {...MSG.deleteAccountConfirm} />
          </span>
          {loading ? (
            <div className={styles.loader}>
              <SpinnerLoader appearance={{ theme: 'primary' }} />
            </div>
          ) : (
            <>
              <Button
                appearance={{
                  theme: 'reset',
                  font: 'small',
                  color: 'red',
                  weight: 'medium',
                }}
                onClick={handleDeleteAccount}
                text={MSG.deleteAccountDelete}
                type="submit"
              />
              <Button
                appearance={{
                  theme: 'reset',
                  font: 'small',
                  color: 'grey',
                  weight: 'medium',
                }}
                onClick={() => setConfirmDelete(false)}
                text={MSG.deleteAccountCancel}
                type="submit"
              />
            </>
          )}
        </>
      ) : (
        <Button
          appearance={{
            theme: 'reset',
            font: 'small',
            color: 'red',
            weight: 'medium',
          }}
          onClick={() => setConfirmDelete(true)}
          text={MSG.deleteAccount}
          type="submit"
        />
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

DeleteAccount.displayName = displayName;

export default DeleteAccount;
