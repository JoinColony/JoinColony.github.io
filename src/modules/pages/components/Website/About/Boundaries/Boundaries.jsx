/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';

import styles from './Boundaries.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.About.Boundaries.title',
    defaultMessage: 'Companies That Run on Software, Not Documents',
  },
  body: {
    id: 'pages.Website.About.Boundaries.body',
    defaultMessage: `Software is good at enforcing rules. That’s why
      video games are so much easier to play than board games. Companies
      are basically just rules for managing resources and distributing
      authority.
      {br}{br}
      Most companies today define company rules in documents and legal
      contracts. Financial transactions, even trivial expenses, require
      admin and intermediaries. Employment is inflexible, roles are
      rigid, and promotion is opaque.
      {br}{br}
      Colony helps you define and enforce business rules. That makes
      the rules easier to create and easier to follow, with way less
      admin, and in places they couldn’t before. Like between strangers
      on the internet.`,
  },
});

const displayName = 'pages.Website.About.Boundaries';

const Boundaries = () => (
  <div className={styles.main}>
    <div className={styles.contentContainer}>
      <Heading
        appearance={{ margin: 'none', theme: 'dark' }}
        text={MSG.title}
      />
      <div className={styles.body}>
        <p>
          <FormattedMessage {...MSG.body} values={{ br: <br /> }} />
        </p>
      </div>
    </div>
  </div>
);

Boundaries.displayName = displayName;

export default Boundaries;
