/* @flow */

import React, { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Input from '~core/Input';
import Link from '~core/Link';

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
      setCurrentSlide(value);
    },
    [setCurrentSlide],
  );

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
          <Link className={styles.link} href="/" text={MSG.link} />
        </div>
        <div className={styles.canvas}>
          <div>Graphic Here</div>
        </div>
      </div>
    </div>
  );
};

Vision.displayName = displayName;

export default Vision;
