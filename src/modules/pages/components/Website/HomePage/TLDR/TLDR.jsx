/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';

import styles from './TLDR.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.HomePage.TLDR.title',
    defaultMessage: 'The TL;DR',
  },
  textOne: {
    id: 'pages.Website.HomePage.TLDR.textOne',
    defaultMessage: `A colony is a new kind of digital company where rules
      are enforced by software instead of management.`,
  },
  textTwo: {
    id: 'pages.Website.HomePage.TLDR.textTwo',
    defaultMessage: `That means a lot of business administration-like
      authority, budgeting, and payments—can be streamlined or even automated.`,
  },
  textThree: {
    id: 'pages.Website.HomePage.TLDR.textThree',
    defaultMessage: `A colony's rules help people self-organize, meaning fewer
      people can get more done because less management and administration is
      required.`,
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
          <Heading
            appearance={{ size: 'mediumLarge', theme: 'dark', weight: 'thin' }}
            text={MSG.textOne}
          />
        </div>
        <div className={styles.colItem}>
          <Heading
            appearance={{ size: 'mediumLarge', theme: 'dark', weight: 'thin' }}
            text={MSG.textTwo}
          />
        </div>
        <div className={styles.colItem}>
          <Heading
            appearance={{ size: 'mediumLarge', theme: 'dark', weight: 'thin' }}
            text={MSG.textThree}
          />
        </div>
      </div>
    </div>
  </div>
);

TLDR.displayName = displayName;

export default TLDR;
