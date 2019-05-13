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

const Email = ({ setUser, user }: Props) => {
  const initialEmail = user.email || '';
  const [editEmail, setEditEmail] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [emailError, setEmailError] = useState(null);
  const handleCancelEmail = () => {
    setEmail(initialEmail);
    setEditEmail(false);
  };
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const handleSaveEmail = () => {
    if (email) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          sessionID: user.session.id,
        }),
      };
      // eslint-disable-next-line no-undef
      fetch('http://localhost:8080/api/email', options)
        .then(response => response.json())
        .then(data => {
          setUser({ ...user, email: data.email });
          setEditEmail(false);
        })
        .catch(message => {
          setEmailError(message);
        });
    }
  };
  return (
    <div className={styles.field}>
      <Input
        disabled={!editEmail}
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
        onClick={editEmail ? handleSaveEmail : () => setEditEmail(true)}
        style={editEmail ? { marginRight: '15px' } : {}}
        text={editEmail ? MSG.emailSave : MSG.emailEdit}
        type="submit"
      />
      {editEmail && (
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
      {emailError && <p className={styles.error}>{emailError}</p>}
    </div>
  );
};

Email.displayName = displayName;

export default Email;
