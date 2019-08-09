/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';

import styles from './FeatureGrid.module.css';

const MSG = defineMessages({
  bodyBudgeting: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyBudgeting',
    defaultMessage: `Budgets may be allocated to Domains which may
      manage funds via rules appropriate to that domain.`,
  },
  bodyContract: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyContract',
    defaultMessage: `A colony may execute external smart contract
      calls, enabling plug and play governance for Ethereum protocols.`,
  },
  bodyDisputes: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyDisputes',
    defaultMessage: `Raise objections, resolve disagreements, and
      incentivize a colony to self-regulate.`,
  },
  bodyDomains: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyDomains',
    defaultMessage: `Structure your colony into teams, departments,
      circles, projects, or whatever is appropriate.`,
  },
  bodyPayments: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyPayments',
    defaultMessage: `From salaries to gigs, and bounties to tips,
      payments can be denominated in Ether, DAI, or any ERC20
      compatible token.`,
  },
  bodyPermissions: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyPermissions',
    defaultMessage: `Distribute authority over distinct aspects of
      business administration. Assign them to people, bots, or contracts.`,
  },
  bodyReputation: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyReputation',
    defaultMessage: `Who did what work, what skills they used, which
      domains it was in, how valuable it was, and how well they did it.`,
  },
  bodyRevenue: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyRevenue',
    defaultMessage: `Share revenue between a colony’s members
      proportional to their combined Tokens and Reputation.`,
  },
  titleBudgeting: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titleBudgeting',
    defaultMessage: 'Budgeting',
  },
  titleContract: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titleContract',
    defaultMessage: 'Contract execution*',
  },
  titleDisputes: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titleDisputes',
    defaultMessage: 'Disputes*',
  },
  titleDomains: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titleDomains',
    defaultMessage: 'Domains',
  },
  titlePayments: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titlePayments',
    defaultMessage: 'Payments',
  },
  titlePermissions: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titlePermissions',
    defaultMessage: 'Permissions',
  },
  titleReputation: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titleReputation',
    defaultMessage: 'Reputation',
  },
  titleRevenue: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titleRevenue',
    defaultMessage: 'Revenue',
  },
});

const BUDGETING = 'Budgeting';
const CONTRACT = 'Contract';
const DISPUTES = 'Disputes';
const DOMAINS = 'Domains';
const PAYMENTS = 'Payments';
const REPUTATION = 'Reputation';
const PERMISSIONS = 'Permissions';
const REVENUE = 'Revenue';

const TOPIC_ORDER = [
  PAYMENTS,
  DOMAINS,
  BUDGETING,
  REPUTATION,
  PERMISSIONS,
  REVENUE,
  DISPUTES,
  CONTRACT,
];

const iconMap = {
  [BUDGETING]: 'icon_budgetAllocation',
  [CONTRACT]: 'icon_contract',
  [DISPUTES]: 'icon_dispute',
  [DOMAINS]: 'icon_domains',
  [PAYMENTS]: 'icon_payment2',
  [PERMISSIONS]: 'icon_permission',
  [REPUTATION]: 'icon_reputation',
  [REVENUE]: 'icon_revenueSharing',
};

const displayName = 'pages.Website.AboutColonyNetwork.FeatureGrid';

const FeatureGrid = () => (
  <div className={styles.main}>
    <div className={styles.grid}>
      {TOPIC_ORDER.map(topic => (
        <div className={styles.gridItem}>
          <Image
            alt={MSG[`title${topic}`]}
            className={styles.image}
            src={withPrefix(`/img/png-icons/${iconMap[topic]}.png`)}
          />
          <Heading
            appearance={{
              size: 'mediumLarge',
              theme: 'dark',
              weight: 'medium',
            }}
            text={MSG[`title${topic}`]}
          />
          <Paragraph
            appearance={{ margin: 'none' }}
            text={MSG[`body${topic}`]}
          />
        </div>
      ))}
    </div>
  </div>
);

FeatureGrid.displayName = displayName;

export default FeatureGrid;
