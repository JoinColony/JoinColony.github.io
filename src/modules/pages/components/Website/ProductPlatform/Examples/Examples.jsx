/* @flow */

import React, { useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';
import GutterSection from '~parts/GutterSection';
import { COLONY_DISCOURSE } from '~routes';

import styles from './Examples.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.ProductPlatform.Examples.gutterLinkText',
    defaultMessage: `Colony’s tools enable many kinds of apps which
      succeed by aligning user incentives around activities that provide
      the application’s value. Need some inspiration? How about these?`,
  },
  bodyExampleTopic0: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic0',
    defaultMessage: `Delivery riders pay a fee to the app from every delivery,
      which purchases Tokens from a token sale curve. Fees are used to run the
      app, and Tokens must be staked to become a rider, so become more scarce
      as the app becomes popular.`,
  },
  bodyExampleTopic1: {
    id: 'pages.Website.ProductPlatform.Examples.bodyExampleTopic1',
    defaultMessage: `Players earn tokens and reputation by working together to
      harvest resources and craft items. The guild sells for cryptocurrency,
      and distributes the revenue proportional to player tokens and
      reputation.`,
  },
  bodyExampleTopic2: {
    id: 'pages.Website.ProductPlatform.Examples.bodyExampleTopic2',
    defaultMessage: `Photo sharing app which distributes tokens to posters
      proportional to the amount of Reputation which likes their photos each
      week. Ads on the app must be paid for in tokens. Buying ads burns
      tokens.`,
  },
  bodyExampleTopic3: {
    id: 'pages.Website.ProductPlatform.Examples.bodyExampleTopic3',
    defaultMessage: `Anybody can propose an edit A member with Reputation must
      back it with Tokens to publish the edit. After 14 days uncontested, both
      the Proposer and the Backer receive tokens and reputation. Generates
      revenue from donations.`,
  },
  bodyExampleTopic4: {
    id: 'pages.Website.ProductPlatform.Examples.bodyExampleTopic4',
    defaultMessage: `Tasks to evaluate claims are created. Evaluators
      participate in a voting game designed to elicit truthful responses by
      punishing dishonest ones. Honest evaluators earn cash payment for each
      successfully evaluated claim.`,
  },
  bodyTopic0: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic0',
    defaultMessage: `Build a better, fairer gig economy, owned and operated
      by its workforce instead of by extractive rentier middlemen.`,
  },
  bodyTopic1: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic1',
    defaultMessage: `Non-Fungible Tokens (NFTs) are set to be the next big
      thing in gaming. Virtual Companies creating and trading goods and
      financial services are the logical next step.`,
  },
  bodyTopic2: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic2',
    defaultMessage: `Social media, and other attention economy platforms rely
      on content creators for the value their platform provides, though they
      rarely receive a share of ad revenue.`,
  },
  bodyTopic3: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic3',
    defaultMessage: `Communities which co-create the value of a product,
      service, or platform. Examples might include a wiki, a forum, a torrent
      tracker, or an open-source software project.`,
  },
  bodyTopic4: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic4',
    defaultMessage: `Integrate microtask crowdsourcing into your application
      and build an autonomous, networked workforce with the necessary checks
      and balances to ensure honesty.`,
  },
  gutterLinkText: {
    id: 'pages.Website.ProductPlatform.Examples.gutterLinkText',
    defaultMessage: 'Head to the forums. There’s work to do!',
  },
  title: {
    id: 'pages.Website.ProductPlatform.Examples.title',
    defaultMessage: 'What Will You Build?',
  },
  linkTopic0: {
    id: 'pages.Website.ProductPlatform.Examples.linkTopic0',
    defaultMessage: 'Gig Economy',
  },
  linkTopic1: {
    id: 'pages.Website.ProductPlatform.Examples.linkTopic1',
    defaultMessage: 'Gaming',
  },
  linkTopic2: {
    id: 'pages.Website.ProductPlatform.Examples.linkTopic2',
    defaultMessage: 'Social Media',
  },
  linkTopic3: {
    id: 'pages.Website.ProductPlatform.Examples.linkTopic3',
    defaultMessage: 'Peer Production',
  },
  linkTopic4: {
    id: 'pages.Website.ProductPlatform.Examples.linkTopic4',
    defaultMessage: 'Crowdsourcing',
  },
  titleExampleTopic0: {
    id: 'pages.Website.ProductPlatform.Examples.titleExampleTopic0',
    defaultMessage: 'Example: FoodDeliveryBikes',
  },
  titleExampleTopic1: {
    id: 'pages.Website.ProductPlatform.Examples.titleExampleTopic1',
    defaultMessage: 'Example: MMORPG Guild',
  },
  titleExampleTopic2: {
    id: 'pages.Website.ProductPlatform.Examples.titleExampleTopic2',
    defaultMessage: 'Example: SocialPhoto',
  },
  titleExampleTopic3: {
    id: 'pages.Website.ProductPlatform.Examples.titleExampleTopic3',
    defaultMessage: 'Example: EncyclopeDAO',
  },
  titleExampleTopic4: {
    id: 'pages.Website.ProductPlatform.Examples.titleExampleTopic4',
    defaultMessage: 'Example: InsuranceClaims',
  },
});

const IMAGE_MAP = {
  topic0: '/img/png-icons/usecase_gigEconomy_reverse.png',
  topic1: '/img/png-icons/usecase_gaming_reverse.png',
  topic2: '/img/png-icons/usecase_socialMedia_reverse.png',
  topic4: '/img/png-icons/usecase_insurance_reverse.png',
  topic3: '/img/png-icons/usecase_peerProduction_reverse.png',
};

const displayName = 'pages.Website.ProductPlatform.Examples';

const Examples = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <GutterSection
      linkRight={{ href: COLONY_DISCOURSE, text: MSG.gutterLinkText }}
    >
      <div className={styles.main}>
        <div className={styles.introRow}>
          <div className={styles.mainContent}>
            <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
            <Paragraph
              appearance={{ margin: 'none', size: 'medium' }}
              text={MSG.body}
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              alt={MSG[`linkTopic${activeItem}`]}
              className={styles.image}
              src={withPrefix(IMAGE_MAP[`topic${activeItem}`])}
            />
          </div>
        </div>
        <div className={styles.contentRow}>
          <div className={styles.currentContent}>
            <Heading
              appearance={{ size: 'large', theme: 'dark' }}
              text={MSG[`linkTopic${activeItem}`]}
            />
            <Paragraph text={MSG[`bodyTopic${activeItem}`]} />
            <Heading
              appearance={{ size: 'mediumLarge', theme: 'dark' }}
              text={MSG[`titleExampleTopic${activeItem}`]}
            />
            <Paragraph text={MSG[`bodyExampleTopic${activeItem}`]} />
          </div>
          <div className={styles.contentMenu}>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <button
                  className={
                    activeItem === idx ? styles.activeItem : styles.menuItem
                  }
                  key={MSG[`linkTopic${idx}`].id}
                  onClick={() => {
                    if (activeItem !== idx) {
                      setActiveItem(idx);
                    }
                  }}
                  type="button"
                >
                  <FormattedMessage {...MSG[`linkTopic${idx}`]} />
                </button>
              ))}
          </div>
        </div>
      </div>
    </GutterSection>
  );
};

Examples.displayName = displayName;

export default Examples;
