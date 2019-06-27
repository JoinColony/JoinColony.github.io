/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Link from '~core/Link';
import Image from '~core/Image';

import styles from './MetaMask.module.css';

const MSG = defineMessages({
  getMetaMask: {
    id: 'pages.Dashboard.getMetaMask',
    defaultMessage: 'Get the extension now',
  },
  metamaskMobile: {
    id: 'pages.Dashboard.metamaskMobile',
    defaultMessage: 'Sorry! Not available on mobile... yet.',
  },
  metamaskTitle: {
    id: 'pages.Dashboard.metamaskTitle',
    defaultMessage: 'MetaMask',
  },
  metamaskText: {
    id: 'pages.Dashboard.metamaskText',
    defaultMessage: 'Please unlock MetaMask to log in.',
  },
  metamaskSubText: {
    id: 'pages.Dashboard.metamaskSubText',
    defaultMessage: `Don't have MetaMask? {getMetaMask}.`,
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
            getMetaMask: (
              <Link
                className={styles.link}
                href="https://metamask.io/"
                text={MSG.getMetaMask}
              />
            ),
          }}
          {...MSG.metamaskSubText}
        />
      </p>
      <p className={styles.mobile}>
        <FormattedMessage {...MSG.metamaskMobile} />
      </p>
    </div>
  </div>
);

MetaMask.displayName = displayName;

export default MetaMask;
