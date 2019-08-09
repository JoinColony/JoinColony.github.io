/* @flow */

import React, { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Input from '~core/Input';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import { PAGE_ABOUT_VISION } from '~routes';

import styles from './Vision.module.css';

const MSG = defineMessages({
  slideCounter: {
    id: 'pages.Website.HomePage.Vision.slideCounter',
    defaultMessage: 'Slide number: {num}',
  },
  title: {
    id: 'pages.Website.HomePage.Vision.title',
    defaultMessage: 'Your Colony,{br}Your Rules',
  },
  body: {
    id: 'pages.Website.HomePage.Vision.body',
    defaultMessage: `From benevolent dictatorship to democratic cooperative,
      Colony is modular and customisable, giving you total flexibility,
      and enabling safe experimentation and gradual change.`,
  },
  link: {
    id: 'pages.Website.HomePage.Vision.link',
    defaultMessage: 'Read about the vision',
  },
});

const slides: string[] = [
  withPrefix('/img/homepage-slides/YourColonyYourRules_01.svg'),
  withPrefix('/img/homepage-slides/YourColonyYourRules_02.svg'),
  withPrefix('/img/homepage-slides/YourColonyYourRules_03.svg'),
  withPrefix('/img/homepage-slides/YourColonyYourRules_04.svg'),
];

const displayName = 'pages.Website.HomePage.Vision';

const Vision = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleChange = useCallback(
    (evt: SyntheticEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = evt;
      setCurrentSlide(parseInt(value, 10));
    },
    [setCurrentSlide],
  );

  const activeImage = slides[currentSlide];

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className={styles.controls}>
          <Heading appearance={{ theme: 'dark' }}>
            <FormattedMessage {...MSG.title} values={{ br: <br /> }} />
          </Heading>
          <Paragraph appearance={{ size: 'medium' }} text={MSG.body} />
          <div className={styles.input}>
            <Input
              id={`${displayName}.slider`}
              min="0"
              max={slides.length - 1}
              onChange={handleChange}
              value={currentSlide}
              type="range"
            />
          </div>
          <Link
            className={styles.link}
            href={PAGE_ABOUT_VISION}
            text={MSG.link}
          />
        </div>
        <>
          {activeImage && (
            <div className={styles.canvas}>
              <Image
                alt={MSG.slideCounter}
                altValues={{ num: slides.indexOf(activeImage) + 1 }}
                className={styles.slideImage}
                src={activeImage}
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

Vision.displayName = displayName;

export default Vision;
