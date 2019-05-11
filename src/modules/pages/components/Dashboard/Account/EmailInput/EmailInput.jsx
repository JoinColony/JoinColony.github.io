/* @flow */

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import Input from '~core/Input';

import type { User } from '~types';

import styles from './EmailInput.module.css';

const MSG = defineMessages({
  emailInputLabel: {
    id: 'pages.Dashboard.Account.EmailInput.emailInputLabel',
    defaultMessage: 'Email',
  },
  emailInputCancel: {
    id: 'pages.Dashboard.Account.EmailInput.emailInputCancel',
    defaultMessage: 'Cancel',
  },
  emailInputEdit: {
    id: 'pages.Dashboard.Account.EmailInput.emailInputEdit',
    defaultMessage: 'Edit',
  },
  emailInputSave: {
    id: 'pages.Dashboard.Account.EmailInput.emailInputSave',
    defaultMessage: 'Save',
  },
});

type Props = {|
  setUser: (user: User) => void,
  user: User,
|};

const displayName = 'pages.Dashboard.Account.EmailInput';

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
        label={MSG.emailInputLabel}
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
        text={editEmail ? MSG.emailInputSave : MSG.emailInputEdit}
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
          text={MSG.emailInputCancel}
          type="submit"
        />
      )}
      {emailError && <p className={styles.error}>{emailError}</p>}
    </div>
  );
};

EmailInput.displayName = displayName;

export default EmailInput;
