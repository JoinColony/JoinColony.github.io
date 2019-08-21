/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import BadgeGroup from '~core/BadgeGroup';
import Heading from '~core/Heading';

import styles from './Roadmap.module.css';

const MSG = defineMessages({
  labelLessSoon: {
    id: 'pages.Website.ProductDapp.Roadmap.labelLessSoon',
    defaultMessage: 'Coming less soon',
  },
  labelSoon: {
    id: 'pages.Website.ProductDapp.Roadmap.labelSoon',
    defaultMessage: 'Coming soon',
  },
  title: {
    id: 'pages.Website.ProductDapp.Roadmap.title',
    defaultMessage: 'Roadmap',
  },
});

const MSG_SOON_BADGES = defineMessages({
  integrations: {
    id: 'pages.Website.ProductDapp.Roadmap.integrations',
    defaultMessage: 'Integrations',
  },
  reputationVoting: {
    id: 'pages.Website.ProductDapp.Roadmap.reputationVoting',
    defaultMessage: 'Reputation Weighted Voting',
  },
  suggestions: {
    id: 'pages.Website.ProductDapp.Roadmap.suggestions',
    defaultMessage: 'Suggestions',
  },
  permissions: {
    id: 'pages.Website.ProductDapp.Roadmap.permissions',
    defaultMessage: 'Domain Level Permissions',
  },
  funding: {
    id: 'pages.Website.ProductDapp.Roadmap.funding',
    defaultMessage: 'Domain Level Funding',
  },
});

const MSG_LESS_SOON_BADGES = defineMessages({
  queues: {
    id: 'pages.Website.ProductDapp.Roadmap.queues',
    defaultMessage: 'Funding Queues',
  },
  tokenVoting: {
    id: 'pages.Website.ProductDapp.Roadmap.tokenVoting',
    defaultMessage: 'Token Weighted Voting',
  },
  budgetBox: {
    id: 'pages.Website.ProductDapp.Roadmap.budgetBox',
    defaultMessage: 'Budget Box',
  },
  disputes: {
    id: 'pages.Website.ProductDapp.Roadmap.disputes',
    defaultMessage: 'Objections & Disputes',
  },
  control: {
    id: 'pages.Website.ProductDapp.Roadmap.control',
    defaultMessage: 'Contract Control',
  },
});

const displayName = 'pages.Website.ProductDapp.Roadmap';

const Roadmap = () => (
  <div className={styles.main}>
    <div className={styles.innerContent}>
      <div className={styles.contentContainer}>
        <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
      </div>
      <div className={styles.badgeGroups}>
        <div className={styles.groupItem}>
          <BadgeGroup
            labelText={MSG.labelSoon}
            messageGroups={[MSG_SOON_BADGES]}
          />
        </div>
        <div className={styles.groupItem}>
          <BadgeGroup
            badgeColor="secondary"
            labelText={MSG.labelLessSoon}
            messageGroups={[MSG_LESS_SOON_BADGES]}
          />
        </div>
      </div>
    </div>
  </div>
);

Roadmap.displayName = displayName;

export default Roadmap;
