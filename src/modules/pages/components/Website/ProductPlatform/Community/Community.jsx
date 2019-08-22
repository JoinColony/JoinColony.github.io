/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import { PAGE_ABOUT_METACOLONY } from '~routes';

import styles from './Community.module.css';

const MSG = defineMessages({
  bodyCommunity: {
    id: 'pages.Website.ProductPlatform.Community.bodyCommunity',
    defaultMessage: `No, really: it's called 'The Metacolony' and
      exists to optimise Colony’s awesomeness. By building with
      Colony, you join a community incentivized by each other’s success.`,
  },
  bodyPays: {
    id: 'pages.Website.ProductPlatform.Community.bodyPays',
    defaultMessage: `Apps built on Colony may enter BudgetBox, a
      mechanism that provides regular CLNY payouts to selected
      applications based on their value to the Colony Network.`,
  },
  bodySeat: {
    id: 'pages.Website.ProductPlatform.Community.bodySeat',
    defaultMessage: `Earning CLNY gives you a stake in the Colony
      Network's success, and direct influence in its decision making.
      You own the platform your app is built on.`,
  },
  headingCommunity: {
    id: 'pages.Website.ProductPlatform.Community.headingCommunity',
    defaultMessage: 'A Community, not a company.',
  },
  headingPays: {
    id: 'pages.Website.ProductPlatform.Community.headingPays',
    defaultMessage: 'It literally pays to build with Colony',
  },
  headingSeat: {
    id: 'pages.Website.ProductPlatform.Community.headingSeat',
    defaultMessage: 'Take your seat at the table',
  },
  linkText: {
    id: 'pages.Website.ProductPlatform.Community.linkText',
    defaultMessage: 'Metacolony',
  },
  title: {
    id: 'pages.Website.ProductPlatform.Community.title',
    defaultMessage: 'A Platform Owned and Operated by its Users.',
  },
});

const Section = ({
  body,
  title,
}: {
  body: MessageDescriptor,
  title: MessageDescriptor,
}) => (
  <div className={styles.section}>
    <Heading
      appearance={{
        margin: 'none',
        size: 'mediumLarge',
        theme: 'lightBlue',
        weight: 'medium',
      }}
      text={title}
    />
    <div className={styles.sectionBody}>
      <Paragraph
        appearance={{ size: 'normal', theme: 'lightBlue' }}
        text={body}
      />
    </div>
  </div>
);

const displayName = 'pages.Website.ProductPlatform.Community';

const Community = () => (
  <div className={styles.main}>
    <div className={styles.image} />
    <div className={styles.contentContainer}>
      <div>
        <Heading
          appearance={{ margin: 'none', theme: 'invert' }}
          text={MSG.title}
        />
      </div>
      <div className={styles.body}>
        <Section body={MSG.bodyCommunity} title={MSG.headingCommunity} />
        <Section body={MSG.bodyPays} title={MSG.headingPays} />
        <Section body={MSG.bodySeat} title={MSG.headingSeat} />
        <Link
          className={styles.link}
          href={PAGE_ABOUT_METACOLONY}
          text={MSG.linkText}
        />
      </div>
    </div>
  </div>
);

Community.displayName = displayName;

export default Community;
