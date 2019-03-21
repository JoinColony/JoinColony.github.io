/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';

import styles from './OpenSource.module.css';

const MSG = defineMessages({
  sectionIntroTitle: {
    id: 'pages.Developers.OpenSource.sectionIntroTitle',
    defaultMessage: 'Open Source Tools',
  },
  sectionIntroText: {
    id: 'pages.Developers.OpenSource.sectionIntroText',
    defaultMessage: 'Standalone tools for Ethereum developers.',
  },
});

const displayName = 'pages.Developers.OpenSource';

const OpenSource = () => (
  <div className={styles.main}>
    <div className={styles.introSection}>
      <Heading
        appearance={{ margin: 'double', theme: 'invert', weight: 'medium' }}
        text={MSG.sectionIntroTitle}
      />
      <p>
        <FormattedMessage {...MSG.sectionIntroText} />
      </p>
    </div>
  </div>
);

OpenSource.displayName = displayName;

export default OpenSource;
