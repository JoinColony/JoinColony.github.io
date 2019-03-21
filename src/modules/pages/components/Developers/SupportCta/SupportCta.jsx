/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';

import styles from './SupportCta.module.css';

const MSG = defineMessages({
  sectionTitle: {
    id: 'pages.Developers.SupportCta.sectionTitle',
    defaultMessage: 'Questions? Problems? Existential dilemmas? We can help!',
  },
});

const displayName = 'pages.Developers.SupportCta';

const SupportCta = () => (
  <div className={styles.main}>
    <Heading
      appearance={{ size: 'huge', theme: 'primary', weight: 'medium' }}
      text={MSG.sectionTitle}
    />
  </div>
);

SupportCta.displayName = displayName;

export default SupportCta;
