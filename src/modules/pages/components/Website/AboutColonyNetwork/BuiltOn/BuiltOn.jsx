/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import Paragraph from '~core/Paragraph';
import GutterSection from '~parts/GutterSection';

import styles from './BuiltOn.module.css';

const MSG = defineMessages({
  bodyEthereum: {
    id: 'pages.Website.AboutColonyNetwork.BuiltOn.bodyEthereum',
    defaultMessage: `Ethereum is a global, open-source platform
      for decentralized applications: public blockchain
      infrastructure for software developers to write code
      that can control digital value, runs exactly as programmed,
      and is accessible anywhere in the world.`,
  },
  bodyIPFS: {
    id: 'pages.Website.AboutColonyNetwork.BuiltOn.bodyIPFS',
    defaultMessage: `IPFS is a distributed system for storing
      and accessing files, websites, applications, and data.
      Being distributed makes is hard for websites to go offline,
      hard for authorities to censor content, and means no
      central entity has to provide storage.`,
  },
  bodyOrbitDB: {
    id: 'pages.Website.AboutColonyNetwork.BuiltOn.bodyOrbitDB',
    defaultMessage: `orbit-db is a serverless, distributed,
      peer-to-peer database. orbit-db uses IPFS as its data
      storage and IPFS Pubsub to automatically sync databases
      with peers. It's an eventually consistent database that
      uses CRDTs for conflict-free database merges making orbit-db
      an excellent choice for offline-first applications.`,
  },
  gutterLink: {
    id: 'pages.Website.AboutColonyNetwork.BuiltOn.gutterLink',
    defaultMessage: 'Visit ethereum.org',
  },
  title: {
    id: 'pages.Website.AboutColonyNetwork.BuiltOn.title',
    defaultMessage: 'Colony is built on:',
  },
  titleEthereum: {
    id: 'pages.Website.AboutColonyNetwork.BuiltOn.titleEthereum',
    defaultMessage: 'Ethereum',
  },
  titleIPFS: {
    id: 'pages.Website.AboutColonyNetwork.BuiltOn.titleIPFS',
    defaultMessage: 'IPFS',
  },
  titleOrbitDB: {
    id: 'pages.Website.AboutColonyNetwork.BuiltOn.titleOrbitDB',
    defaultMessage: 'OrbitDB',
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
      appearance={{
        margin: 'none',
        size: 'medium',
        theme: 'dark',
        weight: 'medium',
      }}
      text={title}
    />
    <div className={styles.gridItemBody}>
      <Paragraph text={body} />
    </div>
  </div>
);

const displayName = 'pages.Website.AboutColonyNetwork.BuiltOn';

const BuiltOn = () => (
  <GutterSection
    appearance={{ oneSide: 'right', theme: 'pink' }}
    linkRight={{
      href: 'https://ethereum.org/what-is-ethereum/',
      text: MSG.gutterLink,
    }}
  >
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        <Heading
          appearance={{
            margin: 'none',
            size: 'large',
            theme: 'dark',
            weight: 'medium',
          }}
          text={MSG.title}
        />
        <div className={styles.gridContainer}>
          <GridItem body={MSG.bodyEthereum} title={MSG.titleEthereum} />
          <GridItem body={MSG.bodyIPFS} title={MSG.titleIPFS} />
          <GridItem body={MSG.bodyOrbitDB} title={MSG.titleOrbitDB} />
        </div>
      </div>
    </div>
  </GutterSection>
);

BuiltOn.displayName = displayName;

export default BuiltOn;
