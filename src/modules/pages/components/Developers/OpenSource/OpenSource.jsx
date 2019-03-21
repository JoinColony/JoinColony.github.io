/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';

import OpenSourceItem from '../OpenSourceItem';

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
  descriptionBudgetBox: {
    id: 'pages.Developers.OpenSource.descriptionBudgetBox',
    defaultMessage:
      // eslint-disable-next-line max-len
      'Solidity reference implementation for a decentralized capital allocation mechanism.',
  },
  descriptionTailor: {
    id: 'pages.Developers.OpenSource.descriptionTailor',
    defaultMessage:
      // eslint-disable-next-line max-len
      'A universal javascript library for interacting with Ethereum: it stitches dApps to Web3.',
  },
  descriptionPinion: {
    id: 'pages.Developers.OpenSource.descriptionPinion',
    defaultMessage:
      // eslint-disable-next-line max-len
      `Dutifully keeps IPFS files 'pinned' and available for your decentralized application.`,
  },
  descriptionTrufflepig: {
    id: 'pages.Developers.OpenSource.descriptionTrufflepig',
    defaultMessage:
      // eslint-disable-next-line max-len
      'A friendly companion for devs that serves contract ABIs over http:// for local development.',
  },
  descriptionPurser: {
    id: 'pages.Developers.OpenSource.descriptionPurser',
    defaultMessage:
      // eslint-disable-next-line max-len
      'A universal javascript library that simplifies interaction with Ethereum wallets.',
  },
  descriptionSolidityCoverage: {
    id: 'pages.Developers.OpenSource.descriptionSolidityCoverage',
    defaultMessage:
      'The original (TM) solidity code-coverage utility for testing.',
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
    <div className={styles.openSourceProductGrid}>
      <div className={styles.openSourceItem}>
        {/* @TODO fix links */}
        <OpenSourceItem
          docsUrl="/docs/asdlkfj"
          githubUrl="/another/thing"
          headingText="budgetBox"
          textContent={MSG.descriptionBudgetBox}
        />
      </div>
      <div className={styles.openSourceItem}>
        {/* @TODO fix links */}
        <OpenSourceItem
          docsUrl="/docs/asdlkfj"
          githubUrl="/another/thing"
          headingText="tailor"
          textContent={MSG.descriptionTailor}
        />
      </div>
      <div className={styles.openSourceItem}>
        {/* @TODO fix links */}
        <OpenSourceItem
          docsUrl="/docs/asdlkfj"
          githubUrl="/another/thing"
          headingText="pinion"
          textContent={MSG.descriptionPinion}
        />
      </div>
      <div className={styles.openSourceItem}>
        {/* @TODO fix links */}
        <OpenSourceItem
          docsUrl="/docs/asdlkfj"
          githubUrl="/another/thing"
          headingText="trufflepig"
          textContent={MSG.descriptionTrufflepig}
        />
      </div>
      <div className={styles.openSourceItem}>
        {/* @TODO fix links */}
        <OpenSourceItem
          docsUrl="/docs/asdlkfj"
          githubUrl="/another/thing"
          headingText="purser"
          textContent={MSG.descriptionPurser}
        />
      </div>
      <div className={styles.openSourceItem}>
        {/* @TODO fix links */}
        <OpenSourceItem
          docsUrl="/docs/asdlkfj"
          githubUrl="/another/thing"
          headingText="solidity-coverage"
          textContent={MSG.descriptionSolidityCoverage}
        />
      </div>
    </div>
  </div>
);

OpenSource.displayName = displayName;

export default OpenSource;
