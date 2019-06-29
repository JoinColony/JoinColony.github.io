/* @flow */

import type { ComponentType } from 'react';

import React, { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import Heading from '~core/Heading';
import Link from '~core/Link';

import SlideDevelopers from './SlideDevelopers';
import SlideHumans from './SlideHumans';

import styles from './Products.module.css';

const MSG = defineMessages({
  controlBodyDevelopers: {
    id: 'pages.Website.HomePage.Products.controlBodyDevelopers',
    defaultMessage: `Build applications that incentivise users,
      generate revenue, and drive growth, autonomously. Colony does
      the heavy lifting, you soak up the glory.`,
  },
  controlBodyHumans: {
    id: 'pages.Website.HomePage.Products.controlBodyHumans',
    defaultMessage: `Spin up a colony, issue a token, and get
      started in minutes. Building an app on Colony? Build it
      using Colony! Think of your app as store-front, and ours
      as back-office.`,
  },
  controlLinkDevelopers: {
    id: 'pages.Website.HomePage.Products.controlLinkDevelopers',
    defaultMessage: 'To the docs!',
  },
  controlLinkHumans: {
    id: 'pages.Website.HomePage.Products.controlLinkHumans',
    defaultMessage: 'Build with Colony',
  },
  controlTitleDevelopers: {
    id: 'pages.Website.HomePage.Products.controlTitleDevelopers',
    defaultMessage: 'Built for Developers',
  },
  controlTitleHumans: {
    id: 'pages.Website.HomePage.Products.controlTitleHumans',
    defaultMessage: 'Designed for Humans',
  },
  gutterLinkText: {
    id: 'pages.Website.HomePage.Products.gutterLinkText',
    defaultMessage: 'Psst... Glider is live on mainnet',
  },
});

const displayName = 'pages.Website.HomePage.Products';

const slides: Array<ComponentType<*>> = [SlideDevelopers, SlideHumans];

const Products = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const isCurrentSlide = useCallback((idx: number) => idx === currentSlide, [
    currentSlide,
  ]);

  return (
    <div className={styles.main}>
      <div className={styles.gutter}>
        <Link className={styles.gutterLink} href="/">
          <div className={styles.gutterLinkText}>
            <FormattedMessage {...MSG.gutterLinkText} />
          </div>
        </Link>
      </div>
      <div className={styles.carousel}>
        <div className={styles.slideCanvas}>
          {slides.map((SlideComponent, idx) => (
            <div
              className={
                isCurrentSlide(idx) ? styles.slideActive : styles.slideInactive
              }
              key={SlideComponent.displayName}
            >
              <SlideComponent />
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <div
            className={`${styles.controlItem} ${
              isCurrentSlide(0) ? styles.active : ''
            }`}
          >
            <Button
              appearance={{ theme: 'reset' }}
              className={styles.controlButton}
              disabled={isCurrentSlide(0)}
              onClick={() => setCurrentSlide(0)}
            >
              <div className={styles.controlItemInner}>
                <Heading
                  className={styles.controlHeading}
                  appearance={{ size: 'mediumLarge', weight: 'medium' }}
                  text={MSG.controlTitleDevelopers}
                />
                <FormattedMessage {...MSG.controlBodyDevelopers} />
                <div className={styles.controlLink}>
                  <Link href="/" text={MSG.controlLinkDevelopers} />
                </div>
              </div>
            </Button>
          </div>
          <div
            className={`${styles.controlItem} ${
              isCurrentSlide(1) ? styles.active : ''
            }`}
          >
            <Button
              appearance={{ theme: 'reset' }}
              className={styles.controlButton}
              disabled={isCurrentSlide(1)}
              onClick={() => setCurrentSlide(1)}
            >
              <div className={styles.controlItemInner}>
                <Heading
                  className={styles.controlHeading}
                  appearance={{ size: 'mediumLarge', weight: 'medium' }}
                  text={MSG.controlTitleHumans}
                />
                <FormattedMessage {...MSG.controlBodyHumans} />
                <div className={styles.controlLink}>
                  <Link href="/" text={MSG.controlLinkHumans} />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.gutter} />
    </div>
  );
};

Products.displayName = displayName;

export default Products;
