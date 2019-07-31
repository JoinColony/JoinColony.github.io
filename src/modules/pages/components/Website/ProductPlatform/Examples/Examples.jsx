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
  // @TODO Body copy to come....
  bodyTopic0: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic0',
    defaultMessage: 'This is copy for body topic 0.',
  },
  bodyTopic1: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic1',
    defaultMessage: 'This is copy for body topic 1.',
  },
  bodyTopic2: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic2',
    defaultMessage: 'This is copy for body topic 2.',
  },
  bodyTopic3: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic3',
    defaultMessage: 'This is copy for body topic 3.',
  },
  bodyTopic4: {
    id: 'pages.Website.ProductPlatform.Examples.bodyTopic4',
    defaultMessage: 'This is copy for body topic 4.',
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
    defaultMessage: 'Insurance',
  },
  linkTopic1: {
    id: 'pages.Website.ProductPlatform.Examples.linkTopic1',
    defaultMessage: 'Gaming',
  },
  linkTopic2: {
    id: 'pages.Website.ProductPlatform.Examples.linkTopic2',
    defaultMessage: 'Gig Economy',
  },
  linkTopic3: {
    id: 'pages.Website.ProductPlatform.Examples.linkTopic3',
    defaultMessage: 'Peer production',
  },
  linkTopic4: {
    id: 'pages.Website.ProductPlatform.Examples.linkTopic4',
    defaultMessage: 'Social media',
  },
});

const IMAGE_MAP = {
  topic0: '/img/png-icons/usecase_insurance_reverse.png',
  topic1: '/img/png-icons/usecase_gaming_reverse.png',
  topic2: '/img/png-icons/usecase_gigEconomy_reverse.png',
  topic3: '/img/png-icons/usecase_peerProduction_reverse.png',
  topic4: '/img/png-icons/usecase_socialMedia_reverse.png',
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
            <Paragraph appearance={{ size: 'medium' }} text={MSG.body} />
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
            <Paragraph text={MSG[`bodyTopic${activeItem}`]} />
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
