/* @flow */

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import Input from '~core/Input';

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
  const handleCancelEmail = () => {
    setEmail(initialEmail);
    setEdit(false);
    setError(null);
  };
  const handleChangeEmail = event => {
    setEmail(event.currentTarget.value);
  };
  const handleSaveEmail = () => {
    if (email) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      };
      // eslint-disable-next-line no-undef
      fetch(`${server}/api/email?sessionID=${user.session.id}`, options)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setTimeout(() => {
              setError(null);
            }, 2000);
          } else {
            setUser({ ...user, email: data.email });
            setEdit(false);
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
        disabled={!edit}
        appearance={{
          padding: 'huge',
          width: 'large',
        }}
        id="email"
        label={MSG.emailLabel}
        onChange={handleChangeEmail}
        type="text"
        value={email}
      />
      <Button
        appearance={{
          theme: 'reset',
          font: 'small',
          color: 'blue',
          weight: 'medium',
        }}
        onClick={edit ? handleSaveEmail : () => setEdit(true)}
        style={edit ? { marginRight: '15px' } : {}}
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
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

Email.displayName = displayName;

export default Email;
