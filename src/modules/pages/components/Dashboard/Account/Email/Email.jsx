/* @flow */

import React, { useEffect, useRef, useState } from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import ErrorMessage from '~core/ErrorMessage';
import Input from '~core/Input';
import SpinnerLoader from '~core/SpinnerLoader';

import type { User } from '~types';

import styles from './Email.module.css';

const MSG = defineMessages({
  emailLabel: {
    id: 'pages.Dashboard.Account.Email.emailLabel',
    defaultMessage: 'Email',
  },
  emailCancel: {
    id: 'pages.Dashboard.Account.Email.emailCancel',
    defaultMessage: 'Cancel',
  },
  emailEdit: {
    id: 'pages.Dashboard.Account.Email.emailEdit',
    defaultMessage: 'Edit',
  },
  emailSave: {
    id: 'pages.Dashboard.Account.Email.emailSave',
    defaultMessage: 'Save',
  },
});

type Props = {|
  setUser: (user: User) => void,
  user: User,
|};

const displayName = 'pages.Dashboard.Account.Email';

const server = process.env.SERVER_URL || 'http://localhost:8080';

const Email = ({ setUser, user }: Props) => {
  const initialEmail = user.email || '';
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const errorTimeout = useRef(null);

  const isValidEmail = input => {
    const valid = /\S+@\S+\.\S+/;
    return valid.test(input);
  };

  const handleCancelEmail = () => {
    setEmail(initialEmail);
    setEdit(false);
    setError(null);
  };

  const handleChangeEmail = event => {
    setError(null);
    setEmail(event.currentTarget.value);
  };

  const handleSaveEmail = () => {
    if (isValidEmail(email)) {
      setLoading(true);
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      };
      // eslint-disable-next-line no-undef
      fetch(`${server}/api/user/email?sessionID=${user.session.id}`, options)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setLoading(false);
            errorTimeout.current = setTimeout(() => {
              setError(null);
            }, 2000);
          } else {
            setUser({ ...user, email: data.email });
            setEdit(false);
            setLoading(false);
          }
        })
        .catch(fetchError => {
          setError(fetchError.message);
          setLoading(false);
          errorTimeout.current = setTimeout(() => {
            setError(null);
          }, 2000);
        });
    } else {
      setError('Please provide a valid email address');
    }
  };

  useEffect(() => {
    return () => {
      if (error) clearTimeout(errorTimeout.current);
    };
  }, [error]);

  return (
    <div className={styles.field}>
      <Input
        disabled={!edit}
        appearance={{
          padding: 'huge',
          width: 'large',
        }}
        id="email"
        error={error}
        label={MSG.emailLabel}
        onChange={handleChangeEmail}
        type="text"
        value={email}
      />
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
              color: 'blue',
              weight: 'medium',
            }}
            onClick={edit ? () => handleSaveEmail() : () => setEdit(true)}
            text={edit ? MSG.emailSave : MSG.emailEdit}
            type="submit"
          />
          {edit && (
            <Button
              appearance={{
                theme: 'reset',
                font: 'small',
                color: 'grey',
                weight: 'medium',
              }}
              onClick={handleCancelEmail}
              text={MSG.emailCancel}
              type="submit"
            />
          )}
        </>
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

Email.displayName = displayName;

export default Email;
