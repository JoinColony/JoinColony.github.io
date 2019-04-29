/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import Input from '~core/Input';

import styles from './Login.module.css';

const MSG = defineMessages({
  createAccountMessage: {
    id: 'pages.Dashboard.createAccountMessage',
    defaultMessage: "MetaMask connected. Let's set up your developer account.",
  },
  createAccountInputLabel: {
    id: 'pages.Dashboard.createAccountInputLabel',
    defaultMessage: `Wallet Address`,
  },
  createAccountGitHubButton: {
    id: 'pages.Dashboard.createAccountGitHubButton',
    defaultMessage: `Connect to GitHub`,
  },
  createAccountGitHubMessage: {
    id: 'pages.Dashboard.createAccountGitHubMessage',
    defaultMessage: `Connect to GitHub to finish setting up your account. We'll
    use your GitHub account to reward you for contributions.`,
  },
});

const displayName = 'pages.Developers.Login';

const Login = () => (
  <>
    <div className={styles.main}>
      <p className={styles.text}>
        <FormattedMessage {...MSG.createAccountMessage} />
      </p>
      <div className={styles.field}>
        <Input
          disabled
          appearance={{
            padding: 'huge',
            weight: 'bold',
            width: 'stretch',
          }}
          id="address"
          label={MSG.createAccountInputLabel}
          type="text"
          value="0xb77D57F4959eAfA0339424b83FcFaf9c15407461"
        />
      </div>
      <div className={styles.field}>
        <Button
          appearance={{
            theme: 'primaryDarkBackground',
            padding: 'huge',
            weight: 'bold',
            width: 'stretch',
          }}
          linkTo="/dashboard/account"
          text={MSG.createAccountGitHubButton}
        />
      </div>
      <p className={styles.subtext}>
        <FormattedMessage {...MSG.createAccountGitHubMessage} />
      </p>
    </div>
  </>
);

Login.displayName = displayName;

export default Login;
