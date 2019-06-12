/* @flow */

import React, { useRef, useState } from 'react';
import { defineMessages } from 'react-intl';

import type { Provider, User } from '~types';

import Button from '~core/Button';
import ErrorMessage from '~core/ErrorMessage';
import Input from '~core/Input';
import SpinnerLoader from '~core/SpinnerLoader';

import styles from './Discourse.module.css';

const MSG = defineMessages({
  connectedAccountsConnect: {
    id: 'pages.Dashboard.Account.connectedAccountsConnect',
    defaultMessage: 'Connect',
  },
  connectedAccountsDiscourseLabel: {
    id: 'pages.Dashboard.Account.connectedAccountsDiscourseLabel',
    defaultMessage: 'Discourse',
  },
  connectedAccountsRemove: {
    id: 'pages.Dashboard.Account.connectedAccountsRemove',
    defaultMessage: 'Remove',
  },
});

type Props = {|
  authenticate: (provider: Provider) => void,
  disconnect: (provider: Provider) => void,
  user: User,
|};

const displayName = 'pages.Dashboard.Account.Discourse';

const server = process.env.SERVER_URL || 'http://localhost:8080';

const Discourse = ({ authenticate, disconnect, user }: Props) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorTimeout = useRef(null);

  const handleRemoveDiscourse = () => {
    setLoading(true);
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    // eslint-disable-next-line no-undef
    fetch(`${server}/api/user/discourse?sessionID=${user.session.id}`, options)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
          errorTimeout.current = setTimeout(() => {
            setError(null);
          }, 2000);
        } else {
          disconnect('discourse');
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
  };
  return (
    <div className={styles.field}>
      <Input
        disabled
        appearance={{
          display: user.discourse ? undefined : 'none',
          padding: 'huge',
          width: 'large',
        }}
        id="discourse"
        label={MSG.connectedAccountsDiscourseLabel}
        type="text"
        value={user.discourse ? `@${user.discourse.username}` : ''}
      />
      {user.discourse ? (
        <>
          {loading ? (
            <div className={styles.loader}>
              <SpinnerLoader appearance={{ theme: 'primary' }} />
            </div>
          ) : (
            <Button
              appearance={{
                theme: 'reset',
                font: 'small',
                color: 'blue',
                weight: 'medium',
              }}
              onClick={handleRemoveDiscourse}
              text={MSG.connectedAccountsRemove}
              type="submit"
            />
          )}
        </>
      ) : (
        <Button
          appearance={{ theme: 'primary', padding: 'large', width: 'fixed' }}
          loading={loading}
          onClick={() => authenticate('discourse')}
          style={{ margin: '12px 0' }}
          text={MSG.connectedAccountsConnect}
          type="submit"
        />
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

Discourse.displayName = displayName;

export default Discourse;
