/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import Input from '~core/Input';

import type { Provider } from '~types';

import styles from './Login.module.css';

const MSG = defineMessages({
  connectGitHubMessage: {
    id: 'pages.Dashboard.connectGitHubMessage',
    defaultMessage: "MetaMask connected. Let's connect your GitHub account.",
  },
  connectGitHubInputLabel: {
    id: 'pages.Dashboard.connectGitHubInputLabel',
    defaultMessage: `Wallet Address`,
  },
  connectGitHubButton: {
    id: 'pages.Dashboard.connectGitHubButton',
    defaultMessage: `Connect GitHub`,
  },
  connectGitHubGitHubMessage: {
    id: 'pages.Dashboard.connectGitHubGitHubMessage',
    defaultMessage: `We'll use your GitHub account to reward you for
    contributions.`,
  },
});

type Props = {|
  authenticate: (provider: Provider) => void,
  serverError?: string,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Login';

const Login = ({ authenticate, serverError, wallet }: Props) => (
  <div className={styles.main}>
    <div className={styles.content}>
      <p className={styles.text}>
        <FormattedMessage {...MSG.connectGitHubMessage} />
      </p>
      <div className={styles.field}>
        <Input
          disabled
          appearance={{
            align: 'center',
            padding: 'huge',
            width: 'stretch',
          }}
          id="address"
          label={MSG.connectGitHubInputLabel}
          type="text"
          value={wallet.address}
        />
      </div>
      <div className={styles.field}>
        <Button
          appearance={{
            theme: 'primary',
            color: 'white',
            padding: 'huge',
            width: 'stretch',
          }}
          onClick={() => authenticate('github')}
          text={MSG.connectGitHubButton}
        />
      </div>
      {serverError && (
        <div className={styles.error}>
          <span className={styles.errorDot} />
          {serverError}
        </div>
      )}
    </div>
  </div>
);

Login.displayName = displayName;

export default Login;
