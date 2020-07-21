/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Icon from '~core/Icon';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';

import { COLONY_DISCORD } from '~routes';

import styles from './DiscordBanner.module.css';

const MSG = defineMessages({
  mainText: {
    id: 'parts.DiscordBanner.mainText',
    defaultMessage: 'Visit discord to join the community',
  },
});

const displayName = 'parts.DiscordBanner';

const DiscordBanner = () => (
  <div className={styles.main}>
    <Link className={styles.link} href={COLONY_DISCORD}>
      <Icon
        className={styles.icon}
        name="social_discord"
        title={MSG.mainText}
      />
      <Paragraph
        appearance={{ margin: 'none', size: 'small' }}
        text={MSG.mainText}
      />
    </Link>
  </div>
);

DiscordBanner.displayName = displayName;

export default DiscordBanner;
