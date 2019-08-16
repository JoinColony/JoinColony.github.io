/* @flow */

import React, { useContext } from 'react';
import { defineMessages } from 'react-intl';

import Announcement from '~core/Announcement';
import Heading from '~core/Heading';
import Image from '~core/Image';
import InputGroup from '~core/InputGroup';
import Paragraph from '~core/Paragraph';
import ThemeContext from '~layouts/WebsiteLayout/context';

import styles from './Hero.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.HomePage.Hero.title',
    defaultMessage: 'Organizations, for the Internet',
  },
  description: {
    id: 'pages.Website.HomePage.Hero.description',
    defaultMessage: `Create, operate, and monetize digital companies that
      succeed through self-organization.`,
  },
  announcement: {
    id: 'pages.Website.HomePage.Hero.announcement',
    defaultMessage: 'Glider is live on mainnet!',
  },
  inputPlaceholder: {
    id: 'pages.Website.HomePage.Hero.inputPlaceholder',
    defaultMessage: 'Get early access to the beta.',
  },
  buttonSubmit: {
    id: 'pages.Website.HomePage.Hero.buttonSubmit',
    defaultMessage: 'See you there',
  },
});

const displayName = 'pages.Website.HomePage.Hero';

const Hero = () => {
  const { headerHeight } = useContext(ThemeContext);
  const style = headerHeight ? { paddingTop: `${headerHeight}px` } : {};
  return (
    <div className={styles.main}>
      <div className={styles.imageContainer} style={style}>
        <Image
          alt={MSG.title}
          className={styles.image}
          src="/img/home_hero.svg"
        />
      </div>
      <div className={styles.contentContainer} style={style}>
        <div className={styles.textContainer}>
          <div>
            <Announcement
              appearance={{ theme: 'grey' }}
              text={MSG.announcement}
            />
            <Heading
              appearance={{
                margin: 'double',
                size: 'massive',
                theme: 'invert',
              }}
              text={MSG.title}
            />
            <Paragraph
              appearance={{ margin: 'none', size: 'medium', theme: 'invert' }}
              text={MSG.description}
            />
          </div>
        </div>
        <InputGroup
          buttonText={MSG.buttonSubmit}
          id={`${displayName}.earlyAccess`}
          onSubmit={value => {
            alert(value);
          }}
          placeholder={MSG.inputPlaceholder}
        />
      </div>
    </div>
  );
};

Hero.displayName = displayName;

export default Hero;
