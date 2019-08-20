/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';
import GutterSection from '~parts/GutterSection';
import { PAGE_PRODUCT_DAPP } from '~routes';

import styles from './WithColony.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.ProductPlatform.WithColony.body',
    defaultMessage: `Colony's app provides powerful tools to coordinate and
      incentivize your team, contributors, and community; enabling you to
      build your app using our app. Think of your app as the store-front
      and ours as the back-office.`,
  },
  gridItemBody0: {
    id: 'pages.Website.ProductPlatform.WithColony.gridItemBody0',
    defaultMessage: `Use your app's native Token, ETH, or DAI to compensate
      the talented people who realize your vision.`,
  },
  gridItemBody1: {
    id: 'pages.Website.ProductPlatform.WithColony.gridItemBody1',
    defaultMessage: `A provable record of the skills people in your colony
      have based on the work they did for it.`,
  },
  gridItemBody2: {
    id: 'pages.Website.ProductPlatform.WithColony.gridItemBody2',
    defaultMessage: `That’s right. Build your dapp on Colony, get on chain
      governance right out the box. Boom.`,
  },
  gridItemTitle0: {
    id: 'pages.Website.ProductPlatform.WithColony.gridItemTitle0',
    defaultMessage: 'Incentivize work',
  },
  gridItemTitle1: {
    id: 'pages.Website.ProductPlatform.WithColony.gridItemTitle1',
    defaultMessage: 'Track Reputation',
  },
  gridItemTitle2: {
    id: 'pages.Website.ProductPlatform.WithColony.gridItemTitle2',
    defaultMessage: 'On-chain governance',
  },
  gutterLinkText: {
    id: 'pages.Website.ProductPlatform.WithColony.gutterLinkText',
    defaultMessage: 'Check out the dapp',
  },
  title: {
    id: 'pages.Website.ProductPlatform.WithColony.title',
    defaultMessage: 'Build With Colony, With Colony!',
  },
});

const GridItem = ({
  body,
  title,
}: {
  body: MessageDescriptor,
  title: MessageDescriptor,
}) => (
  <div className={styles.gridItem}>
    <Heading
      appearance={{ theme: 'dark', size: 'mediumLarge', weight: 'medium' }}
      text={title}
    />
    <Paragraph text={body} />
  </div>
);

const displayName = 'pages.Website.ProductPlatform.WithColony';

const WithColony = () => (
  <GutterSection
    appearance={{ oneSide: 'left' }}
    linkLeft={{ href: PAGE_PRODUCT_DAPP, text: MSG.gutterLinkText }}
    style={{ position: 'relative' }}
  >
    <div className={styles.main}>
      <div className={styles.graphicRow}>
        <div className={styles.content}>
          <div>
            <Heading appearance={{ theme: 'invert' }} text={MSG.title} />
          </div>
          <div>
            <Paragraph
              appearance={{ size: 'normal', theme: 'invert' }}
              text={MSG.body}
            />
          </div>
        </div>
        <Image
          alt={MSG.title}
          className={styles.image}
          src={withPrefix('/img/ColonyHome_mockup.png')}
        />
      </div>
      <div className={styles.gridRow}>
        {Array(3)
          .fill(null)
          .map((_, idx) => (
            <GridItem
              body={MSG[`gridItemBody${idx}`]}
              // `disable` below b/c these will never be reordered, thus React will survive.
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              title={MSG[`gridItemTitle${idx}`]}
            />
          ))}
      </div>
    </div>
  </GutterSection>
);

WithColony.displayName = displayName;

export default WithColony;
