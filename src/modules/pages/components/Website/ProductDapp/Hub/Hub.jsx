/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Link from '~core/Link';
import { COLONY_DISCOURSE } from '~routes';

import Item from './Item.jsx';

import styles from './Hub.module.css';

const MSG = defineMessages({
  bodyTopic0: {
    id: 'pages.Website.ProductDapp.Hub.bodyTopic0',
    defaultMessage: `At vero eos et accusamus et iusto odio
      dignissimos ducimus qui blanditiis praesentium voluptatum
      deleniti atque corrupti quos dolores et quas molestias
      excepturi sint occaecati`,
  },
  bodyTopic1: {
    id: 'pages.Website.ProductDapp.Hub.bodyTopic1',
    defaultMessage: `At vero eos et accusamus et iusto odio
      dignissimos ducimus qui blanditiis praesentium voluptatum
      deleniti atque corrupti quos dolores et quas molestias
      excepturi sint occaecati`,
  },
  bodyTopic2: {
    id: 'pages.Website.ProductDapp.Hub.bodyTopic2',
    defaultMessage: `At vero eos et accusamus et iusto odio
      dignissimos ducimus qui blanditiis praesentium voluptatum
      deleniti atque corrupti quos dolores et quas molestias
      excepturi sint occaecati`,
  },
  bodyTopic3: {
    id: 'pages.Website.ProductDapp.Hub.bodyTopic3',
    defaultMessage: `At vero eos et accusamus et iusto odio
      dignissimos ducimus qui blanditiis praesentium voluptatum
      deleniti atque corrupti quos dolores et quas molestias
      excepturi sint occaecati`,
  },
  bodyTopic4: {
    id: 'pages.Website.ProductDapp.Hub.bodyTopic4',
    defaultMessage: `At vero eos et accusamus et iusto odio
      dignissimos ducimus qui blanditiis praesentium voluptatum
      deleniti atque corrupti quos dolores et quas molestias
      excepturi sint occaecati
      {br}{br}{link}`,
  },
  linkTopic4: {
    id: 'pages.Website.ProductDapp.Hub.linkTopic4',
    defaultMessage: 'Visit the forums!',
  },
  title: {
    id: 'pages.Website.ProductDapp.Hub.title',
    defaultMessage: 'Your Community Contribution Hub',
  },
  titleTopic0: {
    id: 'pages.Website.ProductDapp.Hub.titleTopic0',
    defaultMessage: 'Structure domains',
  },
  titleTopic1: {
    id: 'pages.Website.ProductDapp.Hub.titleTopic1',
    defaultMessage: 'Incentivize contribution',
  },
  titleTopic2: {
    id: 'pages.Website.ProductDapp.Hub.titleTopic2',
    defaultMessage: 'Track Reputation',
  },
  titleTopic3: {
    id: 'pages.Website.ProductDapp.Hub.titleTopic3',
    defaultMessage: 'Customize your colony',
  },
  titleTopic4: {
    id: 'pages.Website.ProductDapp.Hub.titleTopic4',
    defaultMessage: 'Build your community',
  },
});

const IMAGE_MAP = {
  topic0: withPrefix('/img/screencap_domains.png'),
  topic1: withPrefix('/img/screencap_contributions.png'),
  topic2: withPrefix('/img/screenshot_trackRep_1.png'),
  topic3: withPrefix('/img/colony_logomark_circle.png'),
  topic4: withPrefix('/img/screencap_colonyHome.png'),
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
        href={COLONY_DISCOURSE}
        text={MSG.linkTopic4}
      />
    ),
  },
};

const displayName = 'pages.Website.ProductDapp.Hub';

const Hub = () => (
  <div className={styles.main}>
    <div className={styles.introContainer}>
      <Heading
        appearance={{ theme: 'dark', weight: 'bold' }}
        text={MSG.title}
      />
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
