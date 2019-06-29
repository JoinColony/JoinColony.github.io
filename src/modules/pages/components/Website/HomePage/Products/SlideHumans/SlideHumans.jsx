/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Icon from '~core/Icon';

import styles from './SlideHumans.module.css';

const MSG = defineMessages({
  imageAlt: {
    id: 'pages.Website.HomePage.Products.SlideDevelopers.imageAlt',
    defaultMessage: 'Built for Developers',
  },
});

const displayName = 'pages.Website.HomePage.Products.SlideHumans';

const SlideHumans = () => (
  <div className={styles.main}>
    <Icon
      className={styles.image}
      name="designed_for_humans"
      title={MSG.imageAlt}
      viewBox="0 0 30 18"
    />
  </div>
);

SlideHumans.displayName = displayName;

export default SlideHumans;
