/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';

import styles from './CoreProducts.module.css';

const MSG = defineMessages({
  sectionTitle: {
    id: 'pages.Developers.CoreProducts.sectionTitle',
    defaultMessage: 'Colony Core',
  },
  sectionText: {
    id: 'pages.Developers.CoreProducts.sectionText',
    defaultMessage:
      // eslint-disable-next-line max-len
      'Engage with Colony to manage work, shared funds, and reputation. Integrate directly with the smart contracts, use colonyJS to build Colony into your dapp, or fire up the colonyStarter for boilerplates and implementation examples.',
  },
});

const displayName = 'pages.Developers.CoreProducts';

const CoreProducts = () => (
  <div className={styles.main}>
    <div className={styles.gradientWrapper}>
      <div className={styles.sectionIntroContent}>
        <Heading appearance={{ theme: 'invert' }} text={MSG.sectionTitle} />
        <p>
          <FormattedMessage {...MSG.sectionText} />
        </p>
      </div>
    </div>
  </div>
);

CoreProducts.displayName = displayName;

export default CoreProducts;
