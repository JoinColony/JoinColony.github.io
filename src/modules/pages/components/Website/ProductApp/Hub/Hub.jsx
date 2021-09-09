/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Link from '~core/Link';
import { COLONY_DISCORD } from '~routes';

import Item from './Item.jsx';

import styles from './Hub.module.css';

const MSG = defineMessages({
  bodyTopic0: {
    id: 'pages.Website.ProductApp.Hub.bodyTopic0',
    defaultMessage: `Use domains to group work together. You can think
      of them as projects, departments, teams, circles, or whatever makes
      sense for your colony.`,
  },
  bodyTopic1: {
    id: 'pages.Website.ProductApp.Hub.bodyTopic1',
    defaultMessage: `Create tasks, manage delivery of work, and make payments
      using digital currencies and even your own token. Workers can easily
      cash out to their bank.`,
  },
  bodyTopic2: {
    id: 'pages.Website.ProductApp.Hub.bodyTopic2',
    defaultMessage: `It doesn't matter who you are, or where you come from; only
      how good you are. When you get paid for doing work, you earn Reputation in
      your colony.`,
  },
  bodyTopic3: {
    id: 'pages.Website.ProductApp.Hub.bodyTopic3',
    defaultMessage: `Create your colony's landing page to express your brand,
      your mission, and tell people where to go to discover more about your
      work.`,
  },
  bodyTopic4: {
    id: 'pages.Website.ProductApp.Hub.bodyTopic4',
    defaultMessage: `Assemble your team of trusted talent excited and inspired
      by your mission and values. Build belonging in a community forged of
      shared effort and common objectives.
      {br}{br}{link}`,
  },
  linkTopic4: {
    id: 'pages.Website.ProductApp.Hub.linkTopic4',
    defaultMessage: 'Visit the forums!',
  },
  title: {
    id: 'pages.Website.ProductApp.Hub.title',
    defaultMessage: 'Your Community Contribution Hub',
  },
  titleTopic0: {
    id: 'pages.Website.ProductApp.Hub.titleTopic0',
    defaultMessage: 'Structure domains',
  },
  titleTopic1: {
    id: 'pages.Website.ProductApp.Hub.titleTopic1',
    defaultMessage: 'Incentivize contribution',
  },
  titleTopic2: {
    id: 'pages.Website.ProductApp.Hub.titleTopic2',
    defaultMessage: 'Track reputation',
  },
  titleTopic3: {
    id: 'pages.Website.ProductApp.Hub.titleTopic3',
    defaultMessage: 'Customize your colony',
  },
  titleTopic4: {
    id: 'pages.Website.ProductApp.Hub.titleTopic4',
    defaultMessage: 'Build your community',
  },
});

const IMAGE_MAP = {
  topic0: withPrefix('/img/screencap_domains.png'),
  topic1: withPrefix('/img/screencap_contributions.png'),
  topic2: withPrefix('/img/screenshot_trackRep_1.png'),
  topic3: withPrefix('/img/colony_logomark_circle.png'),
  topic4: withPrefix('/img/screencap_ColonyHome.png'),
};

const THUMBNAIL_MAP = {
  topic0: withPrefix('/img/png-icons/icon_domains.png'),
  topic2: withPrefix('/img/png-icons/icon_reputation.png'),
  topic4: withPrefix('/img/png-icons/icon_community.png'),
};

const VALUES = {
  topic4: {
    link: (
      <Link
        className={styles.link}
        href={COLONY_DISCORD}
        text={MSG.linkTopic4}
      />
    ),
  },
};

const displayName = 'pages.Website.ProductApp.Hub';

const Hub = () => (
  <div className={styles.main}>
    <div className={styles.introContainer}>
      <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
    </div>
    <div className={styles.itemList}>
      {Array(5)
        .fill(null)
        .map((_, idx) => (
          <div className={styles.item} key={MSG[`bodyTopic${idx}`].id}>
            <Item
              appearance={idx % 2 ? { theme: 'block' } : undefined}
              body={MSG[`bodyTopic${idx}`]}
              bodyValues={VALUES[`topic${idx}`]}
              image={IMAGE_MAP[`topic${idx}`]}
              thumbnail={THUMBNAIL_MAP[`topic${idx}`]}
              title={MSG[`titleTopic${idx}`]}
            />
          </div>
        ))}
    </div>
  </div>
);

Hub.displayName = displayName;

export default Hub;
