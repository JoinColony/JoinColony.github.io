/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import GridItem from '~core/GridItem';

import styles from './TLDR.module.css';

const MSG = defineMessages({
  headingOne: {
    id: 'pages.Website.HomePage.TLDR.headingOne',
    defaultMessage: 'DAOs made easy',
  },
  headingTwo: {
    id: 'pages.Website.HomePage.TLDR.headingTwo',
    defaultMessage: 'Powerful on-chain governance',
  },
  headingThree: {
    id: 'pages.Website.HomePage.TLDR.headingThree',
    defaultMessage: 'Open, flexible, and extensible',
  },
  title: {
    id: 'pages.Website.HomePage.TLDR.title',
    defaultMessage: 'The TL;DR',
  },
  textOne: {
    id: 'pages.Website.HomePage.TLDR.textOne',
    defaultMessage: `Start an organization, give it structure, incentivize
    contributors, award reputation, and manage funds. No coding required.`,
  },
  textTwo: {
    id: 'pages.Website.HomePage.TLDR.textTwo',
    defaultMessage: `Smart, social decision making mechanisms help your
    organization get stuff done, avoiding voting where possible.`,
  },
  textThree: {
    id: 'pages.Website.HomePage.TLDR.textThree',
    defaultMessage: `Colony is open source and modular, enabling you to
    plug-in extensions to run your organisation your way.`,
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
          <GridItem body={MSG.textOne} title={MSG.headingOne} />
        </div>
        <div className={styles.colItem}>
          <GridItem body={MSG.textTwo} title={MSG.headingTwo} />
        </div>
        <div className={styles.colItem}>
          <GridItem body={MSG.textThree} title={MSG.headingThree} />
        </div>
      </div>
    </div>
  </div>
);

TLDR.displayName = displayName;

export default TLDR;
