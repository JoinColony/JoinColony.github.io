/* @flow */

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import Input from '~core/Input';

import type { User } from '~types';

import styles from './Name.module.css';

const MSG = defineMessages({
  nameCancel: {
    id: 'pages.Dashboard.Account.Name.nameCancel',
    defaultMessage: 'Cancel',
  },
  nameEdit: {
    id: 'pages.Dashboard.Account.Name.nameEdit',
    defaultMessage: 'Edit',
  },
  nameSave: {
    id: 'pages.Dashboard.Account.Name.nameSave',
    defaultMessage: 'Save',
  },
});

type Props = {|
  setUser: (user: User) => void,
  user: User,
|};

const displayName = 'pages.Dashboard.Account.Name';

const Name = ({ setUser, user }: Props) => {
  const initialName = user.name || '';
  const [editName, setEditName] = useState(false);
  const [nameInput, setName] = useState(initialName);
  const [nameError, setNameError] = useState(null);
  const handleCancelName = () => {
    setName(initialName);
    setEditName(false);
  };
  const handleChangeName = event => {
    setName(event.target.value);
  };
  const handleSaveName = () => {
    if (nameInput) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput,
          sessionID: user.session.id,
        }),
      };
      // eslint-disable-next-line no-undef
      fetch('http://localhost:8080/api/name', options)
        .then(response => response.json())
        .then(data => {
          setUser({ ...user, name: data.name });
          setEditName(false);
        })
        .catch(message => {
          setNameError(message);
        });
    }
  };
  return (
    <div className={styles.main}>
      {editName ? (
        <Input
          appearance={{ padding: 'huge', width: 'large' }}
          id="name"
          onChange={handleChangeName}
          style={{ marginRight: '20px', marginTop: '0' }}
          type="text"
          value={nameInput}
        />
      ) : (
        <Button
          appearance={{ theme: 'reset' }}
          className={styles.name}
          onClick={() => setEditName(true)}
        >
          {user.name}
        </Button>
      )}
      {editName && (
        <div>
          <Button
            appearance={{
              theme: 'reset',
              font: 'small',
              color: 'blue',
              weight: 'medium',
            }}
            onClick={handleSaveName}
            style={{ marginRight: '15px' }}
            text={MSG.nameSave}
            type="submit"
          />
          <Button
            appearance={{
              theme: 'reset',
              font: 'small',
              color: 'grey',
              weight: 'medium',
            }}
            onClick={handleCancelName}
            text={MSG.nameCancel}
            type="submit"
          />
        </div>
      )}
      {nameError && <p className={styles.error}>{nameError}</p>}
    </div>
  );
};

Name.displayName = displayName;

export default Name;
