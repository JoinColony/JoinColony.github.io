/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';

import styles from './TLDR.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.HomePage.TLDR.title',
    defaultMessage: 'The TL;DR',
  },
  textOne: {
    id: 'pages.Website.HomePage.TLDR.textOne',
    defaultMessage: `Colony is a platform for internet-native
      companies that succeed through self-organization.`,
  },
  textTwo: {
    id: 'pages.Website.HomePage.TLDR.textTwo',
    defaultMessage: `It enables you to coordinate work, manage
      money, and make decisions, meritocratically.`,
  },
  textThree: {
    id: 'pages.Website.HomePage.TLDR.textThree',
    defaultMessage: `It's not a company; it's organizational
      infrastructure for the internet. Which means it'll last forever.`,
  },
});

const displayName = 'pages.Website.HomePage.TLDR';

const TLDR = () => (
  <div className={styles.main}>
    <div className={styles.row}>
      <div>
        <Heading
          appearance={{ margin: 'double', size: 'huge', theme: 'dark' }}
          text={MSG.title}
        />
      </div>
      <div className={styles.cols}>
        <div className={styles.colItem}>
          <p>
            <FormattedMessage {...MSG.textOne} />
          </p>
        </div>
        <div className={styles.colItem}>
          <p>
            <FormattedMessage {...MSG.textTwo} />
          </p>
        </div>
        <div className={styles.colItem}>
          <p>
            <FormattedMessage {...MSG.textThree} />
          </p>
        </div>
      </div>
    </div>
  </div>
);

TLDR.displayName = displayName;

export default TLDR;
