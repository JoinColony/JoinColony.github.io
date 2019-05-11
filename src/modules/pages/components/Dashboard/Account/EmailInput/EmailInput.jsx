/* @flow */
/* eslint-disable react/no-unused-prop-types */

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import Input from '~core/Input';

import type { User } from '~types';

import styles from './EmailInput.module.css';

const MSG = defineMessages({
  connectedAccountsEmailLabel: {
    id: 'pages.Dashboard.Account.connectedAccountsEmailLabel',
    defaultMessage: 'Email',
  },
  connectedAccountsCancel: {
    id: 'pages.Dashboard.Account.connectedAccountsCancel',
    defaultMessage: 'Cancel',
  },
  connectedAccountsEdit: {
    id: 'pages.Dashboard.Account.connectedAccountsEdit',
    defaultMessage: 'Edit',
  },
  connectedAccountsSave: {
    id: 'pages.Dashboard.Account.connectedAccountsSave',
    defaultMessage: 'Save',
  },
});

type Props = {|
  setUser: (user: User) => void,
  user: User,
|};

const displayName = 'pages.Dashboard.Account';

const EmailInput = ({ setUser, user }: Props) => {
  const initialEmail = user.email || '';
  const [editEmail, setEditEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(initialEmail);
  const [emailError, setEmailError] = useState(null);
  const handleCancelEmail = () => {
    setEmailInput(initialEmail);
    setEditEmail(false);
  };
  const handleChangeEmail = event => {
    setEmailInput(event.target.value);
  };
  const handleSaveEmail = () => {
    if (emailInput) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
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
        label={MSG.connectedAccountsEmailLabel}
        onChange={handleChangeEmail}
        type="text"
        value={emailInput}
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
        text={editEmail ? MSG.connectedAccountsSave : MSG.connectedAccountsEdit}
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
          text={MSG.connectedAccountsCancel}
          type="submit"
        />
      )}
      {emailError && <p className={styles.error}>{emailError}</p>}
    </div>
  );
};

EmailInput.displayName = displayName;

export default EmailInput;
