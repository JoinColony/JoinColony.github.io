/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React, { useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Breakpoint from '~core/Breakpoint';
import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import {
  DOCS_COLONY_JS_GET_STARTED,
  DOCS_COLONY_NETWORK,
  DOCS_COLONY_PURSER,
  DOCS_COLONY_STARTER,
  DOCS_COLONY_TAILOR,
  COLONY_GITHUB_COLONYJS,
  COLONY_GITHUB_COLONYNETWORK,
  COLONY_GITHUB_COLONYSTARTER,
  COLONY_GITHUB_PINION,
  COLONY_GITHUB_PURSER,
  COLONY_GITHUB_TAILOR,
  COLONY_GITHUB_TRUFFLEPIG,
  GITHUB_SOLIDITY_COVERAGE,
} from '~routes';

import styles from './DeveloperTools.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.body',
    defaultMessage: `Whether you're building the future of the gig economy,
      a peer-to-peer marketplace, or a social network, Colony’s powerful
      smart contracts, and straightforward JavaScript libraries give you
      the tools you need to succeed.`,
  },
  titleTopic0: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.titleTopic0',
    defaultMessage: 'Core Tools',
  },
  titleTopic1: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.titleTopic1',
    defaultMessage: 'Community Tools',
  },
  linkTextDocs: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.linkTextDocs',
    defaultMessage: 'Docs',
  },
  linkTextGithub: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.linkTextGithub',
    defaultMessage: 'GitHub',
  },
  title: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.title',
    defaultMessage: 'Developer Tools',
  },
});

const MSG_COMMUNITY = defineMessages({
  bodyPinion: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyPinion',
    defaultMessage: 'Pin orbit-db stores and ipfs hashes',
  },
  bodyPurser: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyPurser',
    defaultMessage: `A JavaScript library that simplifies interaction
      with Ethereum wallets`,
  },
  bodyTailor: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyTailor',
    defaultMessage: `A JavaScript library that provides an easy-to-use
      layer between lower-level libraries and your dapp`,
  },
  bodyTrufflePig: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyTrufflePig',
    defaultMessage: `Truffle contract artifact loading tool for local
      development`,
  },
  bodySolidityCoverage: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodySolidityCoverage',
    defaultMessage: `Boilerplates and examples to get started. Spin up an
      application in minutes or create an extension for the Colony Network
      smart contracts.`,
  },
});

const MSG_CORE = defineMessages({
  bodyColonyJS: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyColonyJS',
    defaultMessage: `A JavaScript library with a simple and predictable
      interface for application-layer integrations with the colonyNetwork
      smart contracts.`,
  },
  bodyColonyStarter: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyColonyStarter',
    defaultMessage: `Boilerplates and examples to get started. Spin up an
      application in minutes or create an extension for the Colony Network
      smart contracts.`,
  },
  bodyColonyNetwork: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyColonyNetwork',
    // @TODO update copy with colonyNetwork text
    defaultMessage: `Pre-build UI components making it easy to use Colony
      in your environment, or develop UI modules for the Colony app.`,
  },
});

const GridItem = ({
  body,
  iconName,
  linkDocs,
  linkGithub,
  title,
}: {
  body: MessageDescriptor,
  iconName: string,
  linkDocs?: string,
  linkGithub: string,
  title: string,
}) => (
  <div className={styles.gridItem}>
    <div>
      <div className={styles.itemImageContainer}>
        <Link href={linkGithub}>
          <Icon
            title={title}
            className={styles.itemImage}
            name={iconName}
            viewBox="0 0 94 94"
          />
        </Link>
      </div>
    </div>
    <div className={styles.itemContent}>
      <Link href={linkGithub}>
        <Heading
          className={styles.itemHeading}
          appearance={{ size: 'medium', theme: 'dark', weight: 'medium' }}
          text={title}
        />
      </Link>
      <Paragraph text={body} />
      <div className={styles.itemLinks}>
        {linkDocs && <Link href={linkDocs} text={MSG.linkTextDocs} />}
        <Link href={linkGithub} text={MSG.linkTextGithub} />
      </div>
    </div>
  </div>
);

const displayName = 'pages.Website.ProductPlatform.DeveloperTools';

const DeveloperTools = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className={styles.main}>
      <div className={styles.introContent}>
        <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
        <div className={styles.dynamicContent}>
          <div className={styles.contentMenu}>
            {Array(2)
              .fill(null)
              .map((_, idx) => (
                <button
                  className={
                    activeItem === idx ? styles.activeItem : styles.menuItem
                  }
                  onClick={() => setActiveItem(idx)}
                  type="button"
                >
                  <FormattedMessage {...MSG[`titleTopic${idx}`]} />
                  <Icon
                    className={styles.chevron}
                    name="chevron"
                    title={MSG[`titleTopic${idx}`]}
                  />
                </button>
              ))}
          </div>
          <div className={styles.body}>
            <Breakpoint inclusion="down" size="small">
              <Heading
                appearance={{ size: 'large', weight: 'thin' }}
                text={MSG[`titleTopic${activeItem}`]}
              />
            </Breakpoint>
            <Paragraph text={MSG.body} />
          </div>
        </div>
      </div>
      <div className={styles.gridWrapper}>
        <div className={styles.gridRow}>
          {activeItem === 0 ? (
            <>
              <GridItem
                body={MSG_CORE.bodyColonyJS}
                iconName="logomark_colonyjs"
                linkDocs={DOCS_COLONY_JS_GET_STARTED}
                linkGithub={COLONY_GITHUB_COLONYJS}
                title="colonyJS"
              />
              <GridItem
                body={MSG_CORE.bodyColonyStarter}
                iconName="logomark_colonystarter"
                linkDocs={DOCS_COLONY_STARTER}
                linkGithub={COLONY_GITHUB_COLONYSTARTER}
                title="colonyStarter"
              />
              <GridItem
                body={MSG_CORE.bodyColonyNetwork}
                iconName="logomark_colonynetwork"
                linkDocs={DOCS_COLONY_NETWORK}
                linkGithub={COLONY_GITHUB_COLONYNETWORK}
                title="colonyNetwork"
              />
            </>
          ) : (
            <>
              <GridItem
                body={MSG_COMMUNITY.bodyPinion}
                iconName="logomark_pinion"
                linkGithub={COLONY_GITHUB_PINION}
                title="pinion"
              />
              <GridItem
                body={MSG_COMMUNITY.bodyPurser}
                iconName="logomark_purser"
                linkDocs={DOCS_COLONY_PURSER}
                linkGithub={COLONY_GITHUB_PURSER}
                title="purser"
              />
              <GridItem
                body={MSG_COMMUNITY.bodyTailor}
                iconName="logomark_tailor"
                linkDocs={DOCS_COLONY_TAILOR}
                linkGithub={COLONY_GITHUB_TAILOR}
                title="tailor"
              />
              <GridItem
                body={MSG_COMMUNITY.bodyTrufflePig}
                iconName="logomark_trufflePig"
                linkGithub={COLONY_GITHUB_TRUFFLEPIG}
                title="trufflePig"
              />
              <GridItem
                body={MSG_COMMUNITY.bodySolidityCoverage}
                iconName="logomark_solidityCoverage"
                linkGithub={GITHUB_SOLIDITY_COVERAGE}
                title="solidity-coverage"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

DeveloperTools.displayName = displayName;

export default DeveloperTools;
