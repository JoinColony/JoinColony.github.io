/* @flow */

import React, { useContext } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { withPrefix } from 'gatsby';

import Announcement from '~core/Announcement';
import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';
import ThemeContext from '~layouts/WebsiteLayout/context';

import styles from './Hero.module.css';

const MSG = defineMessages({
  announcement: {
    id: 'pages.Website.ProductPlatform.Hero.announcement',
    defaultMessage: 'The Platform',
  },
  bodyStep1: {
    id: 'pages.Website.ProductPlatform.Hero.bodyStep1',
    defaultMessage: `Coordinate and incentivise desired user
      behaviours using a mixture of prebuilt and custom modules.`,
  },
  bodyStep2: {
    id: 'pages.Website.ProductPlatform.Hero.bodyStep2',
    defaultMessage: `Incentivise early adopters with tokens that are
      easy to earn early on, and gain value as the usage grows.`,
  },
  bodyStep3: {
    id: 'pages.Website.ProductPlatform.Hero.bodyStep3',
    defaultMessage: `Well designed economics increase demand for tokens
      as your app goes from upstart to ubiquity.`,
  },
  title: {
    id: 'pages.Website.ProductPlatform.Hero.title',
    defaultMessage: `The Fastest Way to Build Cryptoeconomic Applications`,
  },
  subTitle: {
    id: 'pages.Website.ProductPlatform.Hero.subTitle',
    defaultMessage: `Build applications that incentivize effort, generate
      revenue, and drive growth, autonomously. Here’s how:`,
  },
  titleStep1: {
    id: 'pages.Website.ProductPlatform.Hero.titleStep1',
    defaultMessage: 'Build your app',
  },
  titleStep2: {
    id: 'pages.Website.ProductPlatform.Hero.titleStep2',
    defaultMessage: 'Bootstrap the community',
  },
  titleStep3: {
    id: 'pages.Website.ProductPlatform.Hero.titleStep3',
    defaultMessage: 'Watch it grow',
  },
});

const Step = ({ idx }: {| idx: number |}) => (
  <div className={styles.stepItem}>
    <Heading
      appearance={{ theme: 'lightBlue', weight: 'medium' }}
      text={`${idx}`}
    />
    <Heading
      appearance={{ size: 'mediumLarge', theme: 'lightBlue', weight: 'medium' }}
      text={MSG[`titleStep${idx}`]}
    />
    <Paragraph
      appearance={{ size: 'normal', theme: 'lightBlue' }}
      text={MSG[`bodyStep${idx}`]}
    />
  </div>
);

const displayName = 'pages.Website.ProductPlatform.Hero';

const Hero = () => {
  const { headerHeight } = useContext(ThemeContext);
  return (
    <div className={styles.main}>
      <div
        className={styles.imageContainer}
        style={{ paddingTop: headerHeight }}
      >
        <div className={styles.imageContent}>
          <Image
            alt={MSG.announcement}
            src={withPrefix('/img/yellowTriangle.svg')}
          />
        </div>
      </div>
      <div
        className={styles.contentContainer}
        style={{ paddingTop: headerHeight }}
      >
        <div className={styles.content}>
          <Announcement
            appearance={{ theme: 'grey' }}
            text={MSG.announcement}
          />
          <div className={styles.titleContainer}>
            <Heading
              appearance={{ theme: 'invert', weight: 'bold' }}
              text={MSG.title}
            />
            <Heading
              appearance={{
                theme: 'invert',
                size: 'mediumLarge',
                weight: 'thin',
              }}
              text={MSG.subTitle}
            />
          </div>
          <div className={styles.steps}>
            {[1, 2, 3].map(idx => (
              <Step idx={idx} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.displayName = displayName;

export default Hero;
