/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';
import { COLONY_GITHUB, COLONY_DISCORD } from '~routes';

import styles from './SupportCta.module.css';

const MSG = defineMessages({
  sectionTitle: {
    id: 'parts.SupportCta.sectionTitle',
    defaultMessage: 'Questions? Problems? Existential dilemmas? We can help!',
  },
});

const displayName = 'parts.SupportCta';

const SupportCta = () => (
  <div className={styles.main}>
    <div className={styles.contentWrapper}>
      <Heading
        appearance={{
          size: 'large',
          theme: 'primary',
          weight: 'medium',
        }}
        text={MSG.sectionTitle}
      />
      <div className={styles.iconRow}>
        <Link className={styles.iconItemLink} href={COLONY_GITHUB}>
          <Icon name="social_github" title="GitHub" />
        </Link>
        <Link className={styles.iconItemLink} href={COLONY_DISCORD}>
          <Icon name="social_discord" title="Discord" />
        </Link>
      </div>
    </div>
  </div>
);

SupportCta.displayName = displayName;

export default SupportCta;
