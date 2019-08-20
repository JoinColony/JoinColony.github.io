/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import GridItem from '~core/GridItem';

import styles from './FeatureGrid.module.css';

const MSG = defineMessages({
  bodyBudgeting: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyBudgeting',
    defaultMessage: `Budgets can be allocated to Domains to manage
      funds via a given set of rules.`,
  },
  bodyContract: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyContract',
    defaultMessage: `A colony may execute external smart contract
      calls, enabling plug and play governance for Ethereum protocols.`,
  },
  bodyDisputes: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyDisputes',
    defaultMessage: `Raise objections, resolve disagreements, and
      incentivize a colony to self regulate.`,
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
      business administration. Assign it to people, bots, or smart contracts.`,
  },
  bodyReputation: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyReputation',
    defaultMessage: `Reflecting who did what work, what skills they used,
      how valuable it was, and how well they did it.`,
  },
  bodyRevenue: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.bodyRevenue',
    defaultMessage: `Share revenue between a colony's members
      proportional to the value of their contribution.`,
  },
  titleBudgeting: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titleBudgeting',
    defaultMessage: 'Budgeting',
  },
  titleContract: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titleContract',
    defaultMessage: 'Contract execution (coming soon)',
  },
  titleDisputes: {
    id: 'pages.Website.AboutColonyNetwork.FeatureGrid.titleDisputes',
    defaultMessage: 'Disputes (coming soon)',
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
        <div className={styles.gridItem} key={topic}>
          <GridItem
            body={MSG[`body${topic}`]}
            image={withPrefix(`/img/png-icons/${iconMap[topic]}.png`)}
            title={MSG[`title${topic}`]}
          />
        </div>
      ))}
    </div>
  </div>
);

FeatureGrid.displayName = displayName;

export default FeatureGrid;
