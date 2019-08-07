/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import BadgeGroup from '~core/BadgeGroup';
import Heading from '~core/Heading';
import Paragraph from '~core/Paragraph';

import styles from './LookGood.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.ProductPlatform.LookGood.body',
    defaultMessage: `Building a great dapp is hard, slow, and
      expensive. Building on Colony takes care of all the unsexy
      grunt work, allowing you to focus on your special sauce,
      and get from idea to users fast.`,
  },
  title: {
    id: 'pages.Website.ProductPlatform.LookGood.title',
    defaultMessage: 'Here to Make You Look Good',
  },
  textColony: {
    id: 'pages.Website.ProductPlatform.LookGood.textColony',
    defaultMessage: 'Colony',
  },
  textYou: {
    id: 'pages.Website.ProductPlatform.LookGood.textYou',
    defaultMessage: 'You',
  },
});

const MSG_COLONY_BADGES_COL_1 = defineMessages({
  modularity: {
    id: 'pages.Website.ProductPlatform.LookGood.modularity',
    defaultMessage: 'Modularity',
  },
  userProfiles: {
    id: 'pages.Website.ProductPlatform.LookGood.userProfiles',
    defaultMessage: 'User profiles',
  },
  structure: {
    id: 'pages.Website.ProductPlatform.LookGood.structure',
    defaultMessage: 'Structure',
  },
  incentives: {
    id: 'pages.Website.ProductPlatform.LookGood.incentives',
    defaultMessage: 'Incentives',
  },
  walletIntegrations: {
    id: 'pages.Website.ProductPlatform.LookGood.walletIntegrations',
    defaultMessage: 'Wallet integrations',
  },
});

const MSG_COLONY_BADGES_COL_2 = defineMessages({
  notifications: {
    id: 'pages.Website.ProductPlatform.LookGood.notifications',
    defaultMessage: 'Notifications',
  },
  reputation: {
    id: 'pages.Website.ProductPlatform.LookGood.reputation',
    defaultMessage: 'Reputation',
  },
  messaging: {
    id: 'pages.Website.ProductPlatform.LookGood.messaging',
    defaultMessage: 'Messaging',
  },
  upgradability: {
    id: 'pages.Website.ProductPlatform.LookGood.upgradability',
    defaultMessage: 'Upgradability',
  },
});

const MSG_YOU_BADGES = defineMessages({
  youDoYou: {
    id: 'pages.Website.ProductPlatform.LookGood.youDoYou',
    defaultMessage: 'You do you',
  },
});

const displayName = 'pages.Website.ProductPlatform.LookGood';

const LookGood = () => (
  <div className={styles.main}>
    <div className={styles.innerContent}>
      <div className={styles.contentContainer}>
        <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
        <Paragraph text={MSG.body} />
      </div>
      <div className={styles.badgeGroups}>
        <div className={styles.groupItem}>
          <BadgeGroup
            labelText={MSG.textColony}
            messageGroups={[MSG_COLONY_BADGES_COL_1, MSG_COLONY_BADGES_COL_2]}
          />
        </div>
        <div className={styles.groupItem}>
          <BadgeGroup
            badgeColor="secondary"
            labelText={MSG.textYou}
            messageGroups={[MSG_YOU_BADGES]}
          />
        </div>
      </div>
    </div>
  </div>
);

LookGood.displayName = displayName;

export default LookGood;
