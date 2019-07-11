/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';

import styles from './Ambition.module.css';

const MSG = defineMessages({
  introText: {
    id: 'pages.Website.About.Ambition.introText',
    defaultMessage: `Our long term ambition is audacious:
      Colony will catalyze a 'Cambrian explosion' of previously
      impossible organizational forms. The distinctions between
      companies, platforms, workers, and users will blur, and
      new paradigms of occupation and income will emerge.`,
  },
  bodyLeft: {
    id: 'pages.Website.About.Ambition.bodyLeft',
    defaultMessage: `In some cases, these will look similar to
      teams, projects, and companies as we know them today. In
      others, it might look more like a community than a company.
      With thousands of people making small independent
      contributions—like Wikipedia.`,
  },
  bodyRight: {
    id: 'pages.Website.About.Ambition.bodyRight',
    defaultMessage: `In others, you may not even think of what
      you’re doing as “work”. You will just be using an app you
      enjoy, or playing a game. It will just be that the better
      you play this game, or use this app, the more you earn.
      And maybe even, the more of a say you have in how the
      app works.
      {br}{br}{link}`,
  },
  linkText: {
    id: 'pages.Website.About.Ambition.linkText',
    defaultMessage: 'The possibilities are endless.',
  },
});

const displayName = 'pages.Website.About.Ambition';

const Ambition = () => (
  <div className={styles.main}>
    <div className={styles.contentContainer}>
      <Heading
        appearance={{ margin: 'none', size: 'large', weight: 'medium' }}
        className={styles.introText}
        text={MSG.introText}
      />
      <div className={styles.body}>
        <div className={styles.bodyColumn}>
          <p>
            <FormattedMessage {...MSG.bodyLeft} />
          </p>
        </div>
        <div className={styles.bodyColumn}>
          <p>
            <FormattedMessage
              {...MSG.bodyRight}
              values={{
                br: <br />,
                link: <Link href="/" text={MSG.linkText} />,
              }}
            />
          </p>
        </div>
      </div>
    </div>
  </div>
);

Ambition.displayName = displayName;

export default Ambition;
