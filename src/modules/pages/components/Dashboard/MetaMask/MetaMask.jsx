/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Link from '~core/Link';
import Image from '~core/Image';

import styles from './MetaMask.module.css';

const MSG = defineMessages({
  metamaskTitle: {
    id: 'pages.Dashboard.metamaskTitle',
    defaultMessage: 'MetaMask',
  },
  metamaskText: {
    id: 'pages.Dashboard.metamaskText',
    defaultMessage: 'Please unlock MetaMask to login.',
  },
  metamaskSubText: {
    id: 'pages.Dashboard.metamaskSubText',
    defaultMessage: `Don't have MetaMask? Click {here} to get the extension.`,
  },
  metamaskHere: {
    id: 'pages.Dashboard.metamaskHere',
    defaultMessage: 'here',
  },
});

const displayName = 'pages.Dashboard.MetaMask';

const MetaMask = () => (
  <div className={styles.main}>
    <div className={styles.content}>
      <Image
        alt={MSG.metamaskTitle}
        className={styles.image}
        src="/img/metamask.svg"
      />
      <p className={styles.text}>
        <FormattedMessage {...MSG.metamaskText} />
      </p>
      <p className={styles.subtext}>
        <FormattedMessage
          values={{
            here: (
              <Link
                className={styles.link}
                href="https://metamask.io/"
                text={MSG.metamaskHere}
              />
            ),
          }}
          {...MSG.metamaskSubText}
        />
      </p>
    </div>
  </div>
);

MetaMask.displayName = displayName;

export default MetaMask;
