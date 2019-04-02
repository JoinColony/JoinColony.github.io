/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';
import {
  COLONY_DISCOURSE,
  COLONY_GITHUB,
  COLONY_GITTER_COLONYJS,
} from '~routes';

import styles from './SupportCta.module.css';

const MSG = defineMessages({
  sectionTitle: {
    id: 'parts.SupportCta.sectionTitle',
    defaultMessage: 'Questions? Problems? Existential dilemmas? We can help!',
  },
});

type Props = {|
  withBackground?: boolean,
|};

const displayName = 'parts.SupportCta';

const SupportCta = ({ withBackground = false }: Props) => {
  const containerStyles = {};
  if (withBackground) {
    containerStyles.backgroundImage = `url(${withPrefix(
      '/img/devPortal_pattern_bg.svg',
    )})`;
  }
  return (
    <div className={styles.main} style={containerStyles}>
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
          <Link className={styles.iconItemLink} href={COLONY_DISCOURSE}>
            <Icon name="social_discourse_devPortal" title="Discourse" />
          </Link>
          <Link className={styles.iconItemLink} href={COLONY_GITHUB}>
            <Icon name="social_github_devPortal" title="GitHub" />
          </Link>
          <Link className={styles.iconItemLink} href={COLONY_GITTER_COLONYJS}>
            <Icon name="social_gitter_devPortal" title="Gitter" />
          </Link>
        </div>
      </div>
    </div>
  );
};

SupportCta.displayName = displayName;

export default SupportCta;
