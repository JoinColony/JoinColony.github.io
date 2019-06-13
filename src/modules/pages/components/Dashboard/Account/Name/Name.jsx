/* @flow */

import React, { useEffect, useRef, useState } from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import ErrorMessage from '~core/ErrorMessage';
import Input from '~core/Input';
import SpinnerLoader from '~core/SpinnerLoader';

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

const server = process.env.SERVER_URL || 'http://localhost:8080';

const Name = ({ setUser, user }: Props) => {
  const initialName = user.name || '';
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(initialName);
  const errorTimeout = useRef(null);

  const handleCancelName = () => {
    setName(initialName);
    setEdit(false);
    setError(null);
  };

  const handleChangeName = event => {
    setError(null);
    setName(event.currentTarget.value);
  };

  const handleSaveName = () => {
    if (name) {
      setLoading(true);
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      };
      // eslint-disable-next-line no-undef
      fetch(`${server}/api/user/name?sessionID=${user.session.id}`, options)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            setLoading(false);
            errorTimeout.current = setTimeout(() => {
              setError(null);
            }, 2000);
          } else {
            setUser({ ...user, name: data.name });
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
    }
  };

  useEffect(() => {
    return () => {
      if (error) clearTimeout(errorTimeout.current);
    };
  }, [error]);

  return (
    <div>
      <div className={styles.main}>
        {edit ? (
          <>
            <Input
              appearance={{ padding: 'huge', size: 'large' }}
              id="name"
              onChange={handleChangeName}
              style={{ marginRight: '20px', marginTop: '0' }}
              type="text"
              value={name}
            />
            {loading ? (
              <SpinnerLoader appearance={{ theme: 'primary' }} />
            ) : (
              <>
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
              </>
            )}
          </>
        ) : (
          <Button
            appearance={{ theme: 'reset' }}
            className={styles.name}
            onClick={() => setEdit(true)}
          >
            {user.name}
          </Button>
        )}
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

Name.displayName = displayName;

export default Name;
