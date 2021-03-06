/* @flow */

import React from 'react';

import Icon from '~core/Icon';
import Link from '~core/Link';
import {
  COLONY_BLOG,
  COLONY_DISCOURSE,
  COLONY_DISCORD,
  COLONY_GITHUB,
  COLONY_TWITTER,
} from '~routes';
import { getMainClasses } from '~utils/css';

import styles from './SocialNav.module.css';

type Appearance = {|
  theme?: 'dark' | 'light',
|};

type Props = {|
  appearance?: Appearance,
|};

const displayName = 'parts.SocialNav';

const SocialNav = ({ appearance }: Props) => (
  <div className={getMainClasses(appearance, styles)}>
    <div className={styles.inner}>
      <Link alt="Ghost" href={COLONY_BLOG}>
        <Icon
          className={styles.socialIcon}
          title="Ghost"
          name="social_ghost_devPortal"
        />
      </Link>
      <Link alt="Twitter" href={COLONY_TWITTER}>
        <Icon
          className={styles.socialIcon}
          title="Twitter"
          name="social_twitter_devPortal"
        />
      </Link>
      <Link alt="Discourse" href={COLONY_DISCOURSE}>
        <Icon
          className={styles.socialIcon}
          title="Discourse"
          name="social_discourse_devPortal"
        />
      </Link>
      <Link alt="GitHub" href={COLONY_GITHUB}>
        <Icon
          className={styles.socialIcon}
          title="GitHub"
          name="social_github_devPortal"
        />
      </Link>
      <Link alt="Discord" href={COLONY_DISCORD}>
        <Icon
          className={styles.socialIcon}
          title="Discord"
          name="social_discord"
        />
      </Link>
    </div>
  </div>
);

SocialNav.displayName = displayName;

export default SocialNav;
