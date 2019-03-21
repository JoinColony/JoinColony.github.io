/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';

import CoreProductsItem from '../CoreProductsItem';

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
  colonyJsDescription: {
    id: 'pages.Developers.CoreProducts.colonyJsDescription',
    defaultMessage:
      // eslint-disable-next-line max-len
      'A javascript library for application-layer integrations with the Colony Network contracts.',
  },
  colonyNetworkDescription: {
    id: 'pages.Developers.CoreProducts.colonyNetworkDescription',
    defaultMessage:
      // eslint-disable-next-line max-len
      'Robust and secure smart contracts for managing work, permissions, and reputation on the blockchain.',
  },
  colonyStarterDescription: {
    id: 'pages.Developers.CoreProducts.colonyStarterDescription',
    defaultMessage:
      // eslint-disable-next-line max-len
      'Boilerplates to get going quickly with your favorite framework. Set up a new project in minutes or build out from an example project.',
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
      {/* @TODO StaticQuery for projects here? */}
      <div className={styles.coreProductsRow}>
        <div className={styles.coreProductsItem}>
          <CoreProductsItem
            contentText={MSG.colonyJsDescription}
            // @TODO correct links
            docsUrl="/docs/something"
            githubUrl="/another/github"
            titleText="colonyJS"
          />
        </div>
        <div className={styles.coreProductsItem}>
          <CoreProductsItem
            contentText={MSG.colonyNetworkDescription}
            // @TODO correct links
            docsUrl="/docs/something"
            githubUrl="/another/github"
            titleText="colonyNetwork"
          />
        </div>
        <div className={styles.coreProductsItem}>
          <CoreProductsItem
            contentText={MSG.colonyStarterDescription}
            // @TODO correct links
            docsUrl="/docs/something"
            githubUrl="/another/github"
            titleText="colonyStarter"
          />
        </div>
      </div>
    </div>
  </div>
);

CoreProducts.displayName = displayName;

export default CoreProducts;
