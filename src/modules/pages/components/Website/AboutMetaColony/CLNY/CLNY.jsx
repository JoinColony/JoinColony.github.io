/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';

import { PAGE_ABOUT_COLONY_NETWORK } from '~routes';

import styles from './CLNY.module.css';

const MSG = defineMessages({
  bodyAuctions: {
    id: 'pages.Website.AboutMetaColony.CLNY.bodyAuctions',
    defaultMessage: `Fees denominated in any other Token are
      auctioned for CLNY, which is burned.`,
  },
  bodyGovernance: {
    id: 'pages.Website.AboutMetaColony.CLNY.bodyGovernance',
    defaultMessage: `Some types of activity in a colony
      require an amount of its native token, CLNY, to be
      ‘staked’ as a surety. Successfully performing the
      activity earns the staker CLNY and Reputation.`,
  },
  bodyReputation: {
    id: 'pages.Website.AboutMetaColony.CLNY.bodyReputation',
    defaultMessage: `Reputation is earned by doing work, but
      (as in life) decays over time. These network-wide
      Reputation updates are calculated off-chain by
      'Reputation Miners' who stake CLNY to compete to perform
      them to earn CLNY and Reputation.
      {br}{br}{link}
      `,
  },
  bodyReputationLink: {
    id: 'pages.Website.AboutMetaColony.CLNY.bodyReputationLink',
    defaultMessage: 'Wanna see how deep this rabbit hole goes?',
  },
  bodyRevenue: {
    id: 'pages.Website.AboutMetaColony.CLNY.bodyRevenue',
    defaultMessage: `The Colony Network levies a 2.77% fee on all
      Payments and Rewards payouts. Fees denominated in ETH or
      DAI are revenue, and are split between the Metacolony’s working
      capital pot and its Rewards pot. Accounts holding both CLNY
      and Reputation in the Metacolony may claim a proportional share
      of its Rewards pot.`,
  },
  introText: {
    id: 'pages.Website.AboutMetaColony.CLNY.introText',
    defaultMessage: `[pronounced siː-ɛl-ɛn-waɪ]
      {br}
      is the native token of the Metacolony and is required for:`,
  },
  title: {
    id: 'pages.Website.AboutMetaColony.CLNY.title',
    defaultMessage: 'CLNY',
  },
  titleAuctions: {
    id: 'pages.Website.AboutMetaColony.CLNY.titleAuctions',
    defaultMessage: 'Network fee auctions',
  },
  titleGovernance: {
    id: 'pages.Website.AboutMetaColony.CLNY.titleGovernance',
    defaultMessage: 'Governance',
  },
  titleReputation: {
    id: 'pages.Website.AboutMetaColony.CLNY.titleReputation',
    defaultMessage: 'Reputation mining',
  },
  titleRevenue: {
    id: 'pages.Website.AboutMetaColony.CLNY.titleRevenue',
    defaultMessage: 'Revenue sharing',
  },
});

const GridItem = ({
  body,
  bodyValues,
  image,
  title,
}: {
  body: MessageDescriptor,
  bodyValues?: Object,
  image: string,
  title: MessageDescriptor,
}) => (
  <div className={styles.gridItem}>
    <div className={styles.gridItemImage}>
      <Image alt={title} className={styles.image} src={image} />
    </div>
    <div className={styles.gridItemContent}>
      <Heading
        appearance={{ size: 'mediumLarge', theme: 'dark', weight: 'medium' }}
        text={title}
      />
      <Paragraph text={body} textValues={bodyValues} />
    </div>
  </div>
);

const displayName = 'pages.Website.AboutMetaColony.CLNY';

const CLNY = () => (
  <div className={styles.main}>
    <div className={styles.contentContainer}>
      <div className={styles.introText}>
        <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
        <Paragraph appearance={{ size: 'medium' }} text={MSG.introText} />
      </div>
      <div className={styles.contentGridContainer}>
        <GridItem
          body={MSG.bodyGovernance}
          image={withPrefix('img/png-icons/icon_governance.png')}
          title={MSG.titleGovernance}
        />
        <GridItem
          body={MSG.bodyReputation}
          bodyValues={{
            br: <br />,
            link: (
              <Link
                className={styles.standaloneLink}
                text={MSG.bodyReputationLink}
                href={PAGE_ABOUT_COLONY_NETWORK}
              />
            ),
          }}
          image={withPrefix('img/png-icons/icon_reputationMining.png')}
          title={MSG.titleReputation}
        />
        <GridItem
          body={MSG.bodyRevenue}
          image={withPrefix('img/png-icons/icon_revenueSharing.png')}
          title={MSG.titleRevenue}
        />
        <GridItem
          body={MSG.bodyAuctions}
          image={withPrefix('img/png-icons/icon_auction.png')}
          title={MSG.titleAuctions}
        />
      </div>
    </div>
    <Image
      className={styles.circleImage}
      alt={MSG.title}
      src={withPrefix('img/blueCircle.svg')}
    />
  </div>
);

CLNY.displayName = displayName;

export default CLNY;
