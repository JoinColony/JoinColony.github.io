/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Image from '~core/Image';
import GutterSection from '~parts/GutterSection';
import { PAGE_ABOUT_COLONY_NETWORK } from '~routes';

import styles from './Toolkit.module.css';

const MSG = defineMessages({
  bodyAuthority: {
    id: 'pages.Website.HomePage.Toolkit.bodyAuthority',
    defaultMessage: `Powerful Permissions give individuals, groups,
      or even apps customizable decision authority in each Domain.`,
  },
  bodyBudgets: {
    id: 'pages.Website.HomePage.Toolkit.bodyBudgets',
    defaultMessage: `Domains can directly manage funds allocated
      to them, with flexibility to temper autonomy with oversight.`,
  },
  bodyPayments: {
    id: 'pages.Website.HomePage.Toolkit.bodyPayments',
    defaultMessage: `Continuous performance review keeps track of
      the work people did, and how well they did it.`,
  },
  bodyPerformance: {
    id: 'pages.Website.HomePage.Toolkit.bodyPerformance',
    defaultMessage: `Doing great work earns you Reputation for the
      skills you used and domains in which you contributed.`,
  },
  bodyStructure: {
    id: 'pages.Website.HomePage.Toolkit.bodyStructure',
    defaultMessage: `Use Domains to divide your colony into teams,
      units, circles, projects, or whatever makes sense.`,
  },
  bodyWork: {
    id: 'pages.Website.HomePage.Toolkit.bodyWork',
    defaultMessage: `Define, incentivize, and coordinate delivery
      of the outputs that provide your colony’s value.  `,
  },
  headingAuthority: {
    id: 'pages.Website.HomePage.Toolkit.headingAuthority',
    defaultMessage: 'Distribute authority',
  },
  headingBudgets: {
    id: 'pages.Website.HomePage.Toolkit.headingBudgets',
    defaultMessage: 'Allocate budgets',
  },
  headingPayments: {
    id: 'pages.Website.HomePage.Toolkit.headingPayments',
    defaultMessage: 'Streamline payments',
  },
  headingPerformance: {
    id: 'pages.Website.HomePage.Toolkit.headingPerformance',
    defaultMessage: 'Quantify performance',
  },
  headingStructure: {
    id: 'pages.Website.HomePage.Toolkit.headingStructure',
    defaultMessage: 'Define structure',
  },
  headingWork: {
    id: 'pages.Website.HomePage.Toolkit.headingWork',
    defaultMessage: 'Coordinate work',
  },
  linkSeeAll: {
    id: 'pages.Website.HomePage.Toolkit.linkSeeAll',
    defaultMessage: 'See all capabilities',
  },
  sectionTitle: {
    id: 'pages.Website.HomePage.Toolkit.sectionTitle',
    defaultMessage: 'The Complete Toolkit for Digital Companies',
  },
});

const AUTHORITY = 'Authority';
const BUDGETS = 'Budgets';
const PAYMENTS = 'Payments';
const PERFORMANCE = 'Performance';
const STRUCTURE = 'Structure';
const WORK = 'Work';

const TOPIC_ORDER = [
  STRUCTURE,
  AUTHORITY,
  BUDGETS,
  WORK,
  PAYMENTS,
  PERFORMANCE,
];

const iconMap = {
  [AUTHORITY]: 'icon_authorityDistribute',
  [BUDGETS]: 'icon_budgetAllocation',
  [PAYMENTS]: 'icon_payment',
  [PERFORMANCE]: 'icon_talent',
  [STRUCTURE]: 'icon_domains',
  [WORK]: 'icon_community',
};

const displayName = 'pages.Website.HomePage.Toolkit';

const Toolkit = () => (
  <GutterSection
    appearance={{ oneSide: 'right' }}
    linkRight={{ href: PAGE_ABOUT_COLONY_NETWORK, text: MSG.linkSeeAll }}
  >
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        <div className={styles.contentInner}>
          <div className={styles.headingContainer}>
            <Heading
              appearance={{ margin: 'double', theme: 'dark', weight: 'bold' }}
              text={MSG.sectionTitle}
            />
          </div>
          <div className={styles.gridContainer}>
            {TOPIC_ORDER.map(topic => (
              <div className={styles.gridItem}>
                <Image
                  alt={MSG[`heading${topic}`]}
                  className={styles.gridItemImage}
                  src={`/img/png-icons/${iconMap[topic]}.png`}
                />
                <Heading
                  appearance={{
                    theme: 'dark',
                    size: 'mediumLarge',
                    weight: 'medium',
                  }}
                  text={MSG[`heading${topic}`]}
                />
                <p className={styles.gridItemBodyText}>
                  <FormattedMessage {...MSG[`body${topic}`]} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </GutterSection>
);

Toolkit.displayName = displayName;

export default Toolkit;
