/* @flow */

import type { ComponentType } from 'react';

import React, { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import Breakpoint from '~core/Breakpoint';
import Heading from '~core/Heading';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import GutterSection from '~parts/GutterSection';
import {
  PAGE_DEV_DOCS,
  PAGE_PRODUCT_DAPP,
  PAGE_PRODUCT_PLATFORM,
} from '~routes';

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

type SlideType = {|
  component: ComponentType<*>,
  linkHref: string,
|};

const slides: { [key: string]: SlideType } = {
  Developers: {
    component: SlideDevelopers,
    linkHref: PAGE_DEV_DOCS,
  },
  Humans: {
    component: SlideHumans,
    linkHref: PAGE_PRODUCT_DAPP,
  },
};

const Products = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const isCurrentSlide = useCallback((idx: number) => idx === currentSlide, [
    currentSlide,
  ]);

  return (
    <GutterSection
      linkLeft={{ href: PAGE_PRODUCT_PLATFORM, text: MSG.gutterLinkText }}
    >
      <Breakpoint size="medium">
        <div className={styles.slideCanvas}>
          {Object.keys(slides).map((key, idx) => {
            const { component: SlideComponent } = slides[key];
            return (
              <div
                className={
                  isCurrentSlide(idx)
                    ? styles.slideActive
                    : styles.slideInactive
                }
                key={SlideComponent.displayName}
              >
                <SlideComponent />
              </div>
            );
          })}
        </div>
        <div className={styles.controls}>
          {Object.keys(slides).map((key, idx) => {
            const isCurrentSlideControl = isCurrentSlide(idx);
            const { linkHref } = slides[key];
            return (
              <div
                className={`${styles.controlItem} ${
                  isCurrentSlideControl ? styles.active : ''
                }`}
                key={key}
              >
                <Button
                  appearance={{ theme: 'reset' }}
                  className={styles.controlButton}
                  disabled={isCurrentSlideControl}
                  onClick={() => setCurrentSlide(idx)}
                >
                  <div className={styles.controlItemInner}>
                    <Heading
                      className={styles.controlHeading}
                      appearance={{ size: 'mediumLarge', weight: 'medium' }}
                      text={MSG[`controlTitle${key}`]}
                    />
                    <div className={styles.body}>
                      <Paragraph text={MSG[`controlBody${key}`]} />
                      <div className={styles.controlLink}>
                        {isCurrentSlideControl ? (
                          <Link
                            href={linkHref}
                            text={MSG[`controlLink${key}`]}
                          />
                        ) : (
                          <FormattedMessage {...MSG[`controlLink${key}`]} />
                        )}
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            );
          })}
        </div>
      </Breakpoint>
      <Breakpoint inclusion="down" size="small">
        {Object.keys(slides)
          .reverse()
          // ^ content order is reversed for mobile
          .map(key => {
            const { component: SlideComponent, linkHref } = slides[key];
            return (
              <div className={styles.smallItem} key={key}>
                <div className={styles.smallSlide}>
                  <SlideComponent />
                </div>
                <div className={styles.smallContent}>
                  <div className={styles.smallContentInner}>
                    <Heading
                      appearance={{
                        size: 'mediumLarge',
                        theme: 'invert',
                        weight: 'medium',
                      }}
                      text={MSG[`controlTitle${key}`]}
                    />
                    <Paragraph
                      appearance={{ theme: 'invert' }}
                      text={MSG[`controlBody${key}`]}
                    />
                    <Link
                      className={styles.smallItemLink}
                      href={linkHref}
                      text={MSG[`controlLink${key}`]}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </Breakpoint>
    </GutterSection>
  );
};

Products.displayName = displayName;

export default Products;
