/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';

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
    <div className={styles.heroTitle}>
      <Heading appearance={{ theme: 'invert' }} text={MSG.heroTitle} />
    </div>
    <div className={styles.heroFeature}>
      <div className={styles.heroFeatureItem}>
        <HeroFeatureItem
          contentText={MSG.heroFeatureGetStartedText}
          headingText={MSG.heroFeatureGetStartedTitle}
          linkText={MSG.heroFeatureGetStartedLinkText}
          linkUrl="/asf"
        />
      </div>
      <div className={styles.heroFeatureItem}>
        <HeroFeatureItem
          contentText={MSG.heroFeatureContributeText}
          headingText={MSG.heroFeatureContributeTitle}
          linkText="GitHub"
          linkUrl="/asf"
        />
      </div>
      <div className={styles.heroFeatureItem}>
        <HeroFeatureItem
          contentText={MSG.heroFeatureForumText}
          headingText={MSG.heroFeatureForumTitle}
          linkText="Discourse"
          linkUrl="/asf"
        />
      </div>
    </div>
  </div>
);

Hero.displayName = displayName;

export default Hero;
