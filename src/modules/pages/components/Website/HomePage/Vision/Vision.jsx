/* @flow */

import type { ComponentType } from 'react';

import React, { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Input from '~core/Input';
import Link from '~core/Link';
import { PAGE_ABOUT_VISION } from '~routes';

import { Vision0, Vision1, Vision2, Vision3, Vision4, Vision5 } from './assets';

import styles from './Vision.module.css';

const MSG = defineMessages({
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

  const slides: Array<ComponentType<*>> = [
    Vision0,
    Vision1,
    Vision2,
    Vision3,
    Vision4,
    Vision5,
  ];

  const ActiveSlide = slides[currentSlide];

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className={styles.controls}>
          <Heading appearance={{ theme: 'dark' }}>
            <FormattedMessage {...MSG.title} values={{ br: <br /> }} />
          </Heading>
          <p className={styles.body}>
            <FormattedMessage {...MSG.body} />
          </p>
          <div className={styles.input}>
            <Input
              id={`${displayName}.slider`}
              min="0"
              max="5"
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
          {ActiveSlide && (
            <div className={styles.canvas}>
              <ActiveSlide className={styles.slideImage} />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

Vision.displayName = displayName;

export default Vision;
