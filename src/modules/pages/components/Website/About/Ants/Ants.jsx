/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';

import styles from './Ants.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.About.Ants.title',
    defaultMessage: 'Ants, Not Empires',
  },
  body: {
    id: 'pages.Website.About.Ants.body',
    defaultMessage: `Colony is inspired by complex adaptive systems, like
      ant colonies: dynamic networks of agents which react and adapt to
      stimuli from each other and their environment. From simple rules
      emerges collective behaviour and self-organization of the system
      as a whole. 
      {br}{br}
      Colony applies these principles to human organizations—enforcing simple
      rules of interaction between people which help them self-organize by
      aligning incentives around a shared goal.`,
  },
});

const displayName = 'pages.Website.About.Ants';

const Ants = () => (
  <div className={styles.main}>
    <div className={styles.row}>
      <div className={styles.contentContainer}>
        <Heading
          appearance={{ theme: 'dark', weight: 'bold' }}
          text={MSG.title}
        />
        <div className={styles.body}>
          <p>
            <FormattedMessage {...MSG.body} values={{ br: <br /> }} />
          </p>
        </div>
      </div>
    </div>
  </div>
);

Ants.displayName = displayName;

export default Ants;
