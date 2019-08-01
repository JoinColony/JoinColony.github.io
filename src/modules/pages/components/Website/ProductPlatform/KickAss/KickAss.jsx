/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import { PAGE_DEV_DOCS, COLONY_DISCOURSE, COLONY_GITHUB } from '~routes';

import styles from './KickAss.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.ProductPlatform.KickAss.body',
    defaultMessage: `Actually, we can't help you chew. That's
      just... icky. But we will be in your corner with fightin'
      tips and shoulder rubs as you go take on the world.`,
  },
  bodyTopic0: {
    id: 'pages.Website.ProductPlatform.KickAss.bodyTopic0',
    defaultMessage: `Our developer portal contains everything
      a developer needs to build decentralized apps in a fraction
      of the time.`,
  },
  bodyTopic1: {
    id: 'pages.Website.ProductPlatform.KickAss.bodyTopic1',
    defaultMessage: `Where we have a need not met by existing tooling,
      we build generic open source solutions. It’s really the least we
      can do.`,
  },
  bodyTopic2: {
    id: 'pages.Website.ProductPlatform.KickAss.bodyTopic2',
    defaultMessage: `Our developer hub is the place to get all those
      burning questions taken care of. Come say hi, we have #cakes.`,
  },
  linkTopic0: {
    id: 'pages.Website.ProductPlatform.KickAss.linkTopic0',
    defaultMessage: 'To the docs!',
  },
  linkTopic1: {
    id: 'pages.Website.ProductPlatform.KickAss.linkTopic1',
    defaultMessage: 'Community tools',
  },
  linkTopic2: {
    id: 'pages.Website.ProductPlatform.KickAss.linkTopic2',
    defaultMessage: 'To the forum',
  },
  title: {
    id: 'pages.Website.ProductPlatform.KickAss.title',
    defaultMessage: 'Helping You Kick Ass and Chew Bubblegum',
  },
  titleTopic0: {
    id: 'pages.Website.ProductPlatform.KickAss.titleTopic0',
    defaultMessage: 'Delightful documentation',
  },
  titleTopic1: {
    id: 'pages.Website.ProductPlatform.KickAss.titleTopic1',
    defaultMessage: 'Committed to open source',
  },
  titleTopic2: {
    id: 'pages.Website.ProductPlatform.KickAss.titleTopic2',
    defaultMessage: 'Join the conversation',
  },
});

const GridItem = ({
  body,
  image,
  linkHref,
  linkText,
  title,
}: {|
  body: MessageDescriptor,
  image: string,
  linkHref: string,
  linkText: MessageDescriptor,
  title: MessageDescriptor,
|}) => (
  <div className={styles.gridItem}>
    <div>
      <Image alt={title} className={styles.itemImage} src={image} />
      <Heading
        appearance={{ size: 'mediumLarge', theme: 'dark', weight: 'medium' }}
        text={title}
      />
      <Paragraph text={body} />
    </div>
    <div>
      <Link className={styles.itemLink} href={linkHref} text={linkText} />
    </div>
  </div>
);

const displayName = 'pages.Website.ProductPlatform.KickAss';

const KickAss = () => (
  <div className={styles.main}>
    <div className={styles.mainInner}>
      <div className={styles.mainContent}>
        <Heading
          appearance={{ theme: 'dark', weight: 'bold' }}
          text={MSG.title}
        />
        <Paragraph appearance={{ size: 'medium' }} text={MSG.body} />
      </div>
      <div className={styles.gridRow}>
        <GridItem
          body={MSG.bodyTopic0}
          image={withPrefix('/img/icon_docsDelight.png')}
          linkHref={PAGE_DEV_DOCS}
          linkText={MSG.linkTopic0}
          title={MSG.titleTopic0}
        />
        <GridItem
          body={MSG.bodyTopic1}
          image={withPrefix('/img/icon_github.png')}
          linkHref={COLONY_GITHUB}
          linkText={MSG.linkTopic1}
          title={MSG.titleTopic1}
        />
        <GridItem
          body={MSG.bodyTopic2}
          image={withPrefix('/img/icon_conversation.png')}
          linkHref={COLONY_DISCOURSE}
          linkText={MSG.linkTopic2}
          title={MSG.titleTopic2}
        />
      </div>
    </div>
    <Image
      className={styles.circleImage}
      alt={MSG.title}
      src={withPrefix('img/pinkCircle.svg')}
    />
  </div>
);

KickAss.displayName = displayName;

export default KickAss;
