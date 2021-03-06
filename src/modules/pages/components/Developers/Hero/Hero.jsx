/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import { COLONY_DISCOURSE, COLONY_GITHUB, DOCS_COLONYJS } from '~routes';

import HeroFeatureItem from '../HeroFeatureItem';

import styles from './Hero.module.css';

const MSG = defineMessages({
  heroTitle: {
    id: 'pages.Developers.heroTitle',
    defaultMessage: 'Build with Colony',
  },
  heroFeatureGetStartedTitle: {
    id: 'pages.Developers.heroFeatureGetStartedTitle',
    defaultMessage: 'Get Started',
  },
  heroFeatureGetStartedText: {
    id: 'pages.Developers.heroFeatureGetStartedText',
    defaultMessage:
      'Build incentives and reputation into your app, firm, or community.',
  },
  heroFeatureGetStartedLinkText: {
    id: 'pages.Developers.heroFeatureGetStartedLinkText',
    defaultMessage: 'Build',
  },
  heroFeatureContributeTitle: {
    id: 'pages.Developers.heroFeatureContributeTitle',
    defaultMessage: 'Contribute',
  },
  heroFeatureContributeText: {
    id: 'pages.Developers.heroFeatureContributeText',
    defaultMessage:
      // eslint-disable-next-line max-len
      'We believe in being open. All of our projects are open-source and accepting contributions.',
  },
  heroFeatureForumTitle: {
    id: 'pages.Developers.heroFeatureForumTitle',
    defaultMessage: 'Discuss',
  },
  heroFeatureForumText: {
    id: 'pages.Developers.heroFeatureForumText',
    defaultMessage:
      'Join in the discussion and collaborate with our community of builders.',
  },
});

const displayName = 'pages.Developers.Hero';

const Hero = () => (
  <div className={styles.main}>
    <div className={styles.heroBackgroundImage}>
      <Image
        alt={MSG.heroTitle}
        src={withPrefix('img/devPortal_banner_bg.svg')}
      />
    </div>
    <div className={styles.contentContainer}>
      <div className={styles.heroTitle}>
        <Heading
          appearance={{ size: 'huge', theme: 'invert', weight: 'medium' }}
          text={MSG.heroTitle}
        />
      </div>
      <div className={styles.heroFeature}>
        <div className={styles.heroFeatureItem}>
          <HeroFeatureItem
            contentText={MSG.heroFeatureGetStartedText}
            headingText={MSG.heroFeatureGetStartedTitle}
            linkText={MSG.heroFeatureGetStartedLinkText}
            linkUrl={DOCS_COLONYJS}
          />
        </div>
        <div className={styles.heroFeatureItem}>
          <HeroFeatureItem
            contentText={MSG.heroFeatureContributeText}
            headingText={MSG.heroFeatureContributeTitle}
            linkText="GitHub"
            linkUrl={COLONY_GITHUB}
          />
        </div>
        <div className={styles.heroFeatureItem}>
          <HeroFeatureItem
            contentText={MSG.heroFeatureForumText}
            headingText={MSG.heroFeatureForumTitle}
            linkText="Discourse"
            linkUrl={COLONY_DISCOURSE}
          />
        </div>
      </div>
    </div>
  </div>
);

Hero.displayName = displayName;

export default Hero;
