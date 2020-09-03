/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';

import styles from './Team.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.AboutMetaColony.Team.body',
    defaultMessage: `Colony is built by a distributed team of passionate
      nerds putting in blood, sweat, and pull requests all around the
      world. We're always open to welcoming kickass contributors.`,
  },
  button: {
    id: 'pages.Website.AboutMetaColony.Team.button',
    defaultMessage: 'Say hi',
  },
  subTitle: {
    id: 'pages.Website.AboutMetaColony.Team.subTitle',
    defaultMessage: 'Wanna contribute to the Metacolony?',
  },
  title: {
    id: 'pages.Website.AboutMetaColony.Team.title',
    defaultMessage: 'Made with {image} in 13 countries (and counting).',
  },
});

const unicodeHeartSymbol = '\u2665';

const displayName = 'pages.Website.AboutMetaColony.Team';

const Team = () => (
  <div className={styles.main}>
    <div className={styles.heroImage} />
    <div className={styles.contentContainer}>
      <div className={styles.leftCol}>
        <Heading appearance={{ margin: 'none', theme: 'dark' }}>
          <FormattedMessage
            {...MSG.title}
            values={{
              image: (
                <Image
                  alt={MSG.title}
                  altValues={{ image: unicodeHeartSymbol }}
                  className={styles.parrot}
                  src={withPrefix('img/colonyParrot.png')}
                />
              ),
            }}
          />
        </Heading>
        <div className={styles.body}>
          <Paragraph
            appearance={{ margin: 'none', size: 'medium' }}
            text={MSG.body}
          />
        </div>
      </div>
      <div className={styles.rightCol}>
        <div>
          <Heading
            appearance={{
              margin: 'none',
              size: 'large',
              theme: 'primary',
              weight: 'medium',
            }}
            text={MSG.subTitle}
          />
        </div>
      </div>
    </div>
  </div>
);

Team.displayName = displayName;

export default Team;
