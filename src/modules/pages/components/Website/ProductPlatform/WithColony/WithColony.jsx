/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React, { useRef } from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';
import { useElementHeight } from '~hooks';
import GutterSection from '~parts/GutterSection';
import { PAGE_PRODUCT_DAPP } from '~routes';

import styles from './WithColony.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.ProductPlatform.WithColony.body',
    defaultMessage: `Colony’s app provides powerful tools to coordinate
      and incentivize your team, contributors, and community; enabling
      you to build your app using our app. Think of it like shop-front
      and back-office.`,
  },
  gridItemBody0: {
    id: 'pages.Website.ProductPlatform.WithColony.gridItemBody0',
    defaultMessage: `Use your app’s native token, ETH, or DAI to compensate
      the talented people who realise your vision.`,
  },
  gridItemBody1: {
    id: 'pages.Website.ProductPlatform.WithColony.gridItemBody1',
    defaultMessage: `A provable record of the skills people in your colony
      have based on the work they did for it.`,
  },
  gridItemBody2: {
    id: 'pages.Website.ProductPlatform.WithColony.gridItemBody2',
    defaultMessage: `Tokens and Reputation allow decision authority to
      devolve to the community safely over time.`,
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
    defaultMessage: 'To the product please!',
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

const WithColony = () => {
  const gridRowRef = useRef(null);
  const gridRowHeight = useElementHeight(gridRowRef);
  return (
    <GutterSection
      appearance={{ themeRight: 'dark' }}
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
        <div className={styles.gridRow} ref={gridRowRef}>
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
      <div
        className={styles.layoutHack}
        // +1 below to align correctly with `.gridRow`... Not sure why ¯\_(ツ)_/¯
        style={{ height: `${gridRowHeight + 1}px` }}
      />
    </GutterSection>
  );
};

WithColony.displayName = displayName;

export default WithColony;
