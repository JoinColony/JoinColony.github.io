/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';

import styles from './TLDR.module.css';

const MSG = defineMessages({
  headingOne: {
    id: 'pages.Website.HomePage.TLDR.headingOne',
    defaultMessage: 'As easy as a web forum.',
  },
  headingTwo: {
    id: 'pages.Website.HomePage.TLDR.headingTwo',
    defaultMessage: 'Software eats middle management',
  },
  headingThree: {
    id: 'pages.Website.HomePage.TLDR.headingThree',
    defaultMessage: 'Incentivize global talent',
  },
  title: {
    id: 'pages.Website.HomePage.TLDR.title',
    defaultMessage: 'The TL;DR',
  },
  textOne: {
    id: 'pages.Website.HomePage.TLDR.textOne',
    defaultMessage: `A colony is a new kind of internet-native digital
      company where rules are enforced by software instead of hierarchy.`,
  },
  textTwo: {
    id: 'pages.Website.HomePage.TLDR.textTwo',
    defaultMessage: `Streamlining and automating business administration,
      and distributing authority, means fewer people can get more done.`,
  },
  textThree: {
    id: 'pages.Website.HomePage.TLDR.textThree',
    defaultMessage: `Issue your colony's token, bootstrap its value, and
      reward people for work instantly, internationally, for free.`,
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
            appearance={{
              margin: 'none',
              size: 'medium',
              theme: 'dark',
            }}
            text={MSG.headingOne}
          />
          <Heading
            appearance={{ size: 'mediumLarge', theme: 'dark', weight: 'thin' }}
            text={MSG.textOne}
          />
        </div>
        <div className={styles.colItem}>
          <Heading
            appearance={{
              margin: 'none',
              size: 'medium',
              theme: 'dark',
            }}
            text={MSG.headingTwo}
          />
          <Heading
            appearance={{ size: 'mediumLarge', theme: 'dark', weight: 'thin' }}
            text={MSG.textTwo}
          />
        </div>
        <div className={styles.colItem}>
          <Heading
            appearance={{
              margin: 'none',
              size: 'medium',
              theme: 'dark',
            }}
            text={MSG.headingThree}
          />
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
