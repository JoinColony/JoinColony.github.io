/* @flow */

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import ErrorMessage from '~core/ErrorMessage';
import Input from '~core/Input';
import SpinnerLoader from '~core/SpinnerLoader';

import type { User } from '~types';

import styles from './Email.module.css';

const MSG = defineMessages({
  emailAdd: {
    id: 'pages.Dashboard.Account.Email.emailAdd',
    defaultMessage: 'Add',
  },
  emailCancel: {
    id: 'pages.Dashboard.Account.Email.emailCancel',
    defaultMessage: 'Cancel',
  },
  emailEdit: {
    id: 'pages.Dashboard.Account.Email.emailEdit',
    defaultMessage: 'Edit',
  },
  emailLabel: {
    id: 'pages.Dashboard.Account.Email.emailLabel',
    defaultMessage: 'Email',
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

const server = process.env.SERVER_URL || 'https://chora.io';

const Email = ({ setUser, user }: Props) => {
  const initialEmail = user.email || '';
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState(null);
  const [input, setInput] = useState(!!user.email);
  const [loading, setLoading] = useState(false);

  const isValidEmail = value => {
    const valid = /\S+@\S+\.\S+/;
    return valid.test(value);
  };

  const handleAddEmail = () => {
    setEdit(true);
    setInput(true);
  };

  const handleCancelEmail = () => {
    setEmail(initialEmail);
    setEdit(false);
    setError(null);
    if (!user.email) {
      setInput(false);
    }
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
          } else {
            setUser({ ...user, email: data.email });
            setEdit(false);
            setLoading(false);
          }
        })
        .catch(fetchError => {
          setError(fetchError.message);
          setLoading(false);
        });
    } else {
      setError('Please provide a valid email address');
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSaveEmail();
    }
  };

  return (
    <div className={styles.field}>
      <Input
        disabled={!edit}
        appearance={{
          display: input ? undefined : 'none',
          padding: 'huge',
          size: 'large',
        }}
        id="email"
        error={error}
        label={MSG.emailLabel}
        onChange={handleChangeEmail}
        onKeyDown={handleKeyDown}
        type="text"
        value={email}
      />
      {input ? (
        <>
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
        </>
      ) : (
        <Button
          appearance={{ theme: 'primary', padding: 'large', size: 'medium' }}
          loading={loading}
          onClick={handleAddEmail}
          style={{ margin: '8px 0' }}
          text={MSG.emailAdd}
          type="submit"
        />
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

Email.displayName = displayName;

export default Email;
