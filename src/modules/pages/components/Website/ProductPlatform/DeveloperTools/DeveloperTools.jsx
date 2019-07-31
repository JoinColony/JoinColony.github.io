/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React, { useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import {
  DOCS_COLONY_JS_GET_STARTED,
  DOCS_COLONY_NETWORK,
  DOCS_COLONY_STARTER,
  COLONY_GITHUB_COLONYJS,
  COLONY_GITHUB_COLONYNETWORK,
  COLONY_GITHUB_COLONYSTARTER,
} from '~routes';

import styles from './DeveloperTools.module.css';

const MSG = defineMessages({
  bodyGridItem0: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyGridItem0',
    defaultMessage: `A JavaScript library with a simple and predictable
      interface for application-layer integrations with the colonyNetwork
      smart contracts.`,
  },
  bodyGridItem1: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyGridItem1',
    defaultMessage: `Boilerplates and examples to get started. Spin up an
      application in minutes or create an extension for the Colony Network
      smart contracts.`,
  },
  bodyGridItem2: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyGridItem2',
    // @TODO update copy with colonyNetwork text
    defaultMessage: `Pre-build UI components making it easy to use Colony
      in your environment, or develop UI modules for the Colony app.`,
  },
  bodyTopic0: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyTopic0',
    defaultMessage: `Where we have a need not met by existing tooling,
      we build generic open source solutions. It’s the least we can do
      to support a movement from which we all benefit daily.`,
  },
  bodyTopic1: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.bodyTopic0',
    // @TODO update this content
    defaultMessage: 'Content not finished',
  },
  buttonTopic0: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.buttonTopic0',
    defaultMessage: 'Core Tools',
  },
  buttonTopic1: {
    id: 'pages.Website.ProductPlatform.DeveloperTools.buttonTopic1',
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

const GridItem = ({
  body,
  iconName,
  linkDocs,
  linkGithub,
  title,
}: {
  body: MessageDescriptor,
  iconName: string,
  linkDocs: string,
  linkGithub: string,
  title: string,
}) => (
  <div className={styles.gridItem}>
    <div>
      <div className={styles.itemImageContainer}>
        <Icon
          title={title}
          className={styles.itemImage}
          name={iconName}
          viewBox="0 0 94 94"
        />
      </div>
      <Heading
        appearance={{ size: 'medium', theme: 'dark', weight: 'medium' }}
        text={title}
      />
      <Paragraph text={body} />
    </div>
    <div className={styles.itemLinks}>
      <Link href={linkDocs} text={MSG.linkTextDocs} />
      <Link href={linkGithub} text={MSG.linkTextGithub} />
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
                  <FormattedMessage {...MSG[`buttonTopic${idx}`]} />
                </button>
              ))}
          </div>
          <div className={styles.activeContent}>
            <Paragraph text={MSG[`bodyTopic${activeItem}`]} />
          </div>
        </div>
      </div>
      <div className={styles.gridRow}>
        <GridItem
          body={MSG.bodyGridItem0}
          iconName="logomark_colonyjs"
          linkDocs={DOCS_COLONY_JS_GET_STARTED}
          linkGithub={COLONY_GITHUB_COLONYJS}
          title="colonyJS"
        />
        <GridItem
          body={MSG.bodyGridItem1}
          iconName="logomark_colonystarter"
          linkDocs={DOCS_COLONY_STARTER}
          linkGithub={COLONY_GITHUB_COLONYSTARTER}
          title="colonyStarter"
        />
        <GridItem
          body={MSG.bodyGridItem2}
          iconName="logomark_colonynetwork"
          linkDocs={DOCS_COLONY_NETWORK}
          linkGithub={COLONY_GITHUB_COLONYNETWORK}
          title="colonyNetwork"
        />
      </div>
    </div>
  );
};

DeveloperTools.displayName = displayName;

export default DeveloperTools;
