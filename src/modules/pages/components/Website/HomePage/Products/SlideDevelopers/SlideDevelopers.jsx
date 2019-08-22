/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Image from '~core/Image';

import styles from './SlideDevelopers.module.css';

const MSG = defineMessages({
  imageAlt: {
    id: 'pages.Website.HomePage.Products.SlideDevelopers.imageAlt',
    defaultMessage: 'Built for Developers',
  },
});

const displayName = 'pages.Website.HomePage.Products.SlideDevelopers';

const SlideDevelopers = () => (
  <div className={styles.main}>
    <Image
      className={styles.image}
      src={withPrefix('/img/screenshot_codeEditor.png')}
      alt={MSG.imageAlt}
    />
  </div>
);

SlideDevelopers.displayName = displayName;

export default SlideDevelopers;
