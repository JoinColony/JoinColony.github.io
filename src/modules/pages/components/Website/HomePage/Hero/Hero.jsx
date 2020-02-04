/* @flow */

import React, { useCallback, useContext } from 'react';
import { defineMessages } from 'react-intl';
import { navigate } from '@reach/router';

import Announcement from '~core/Announcement';
import Button from '~core/Button';
import Heading from '~core/Heading';
import Image from '~core/Image';
import InputGroup from '~core/InputGroup';
import Paragraph from '~core/Paragraph';
import ThemeContext from '~layouts/WebsiteLayout/context';
import SEO from '~parts/SEO';
import { COLONY_APP, PAGE_GET_EARLY_ACCESS } from '~routes';

import styles from './Hero.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.HomePage.Hero.title',
    defaultMessage: 'Colony: a platform for community collaboration.',
  },
  description: {
    id: 'pages.Website.HomePage.Hero.description',
    defaultMessage: `Do work, make decisions, and manage money, together.`,
  },
  announcement: {
    id: 'pages.Website.HomePage.Hero.announcement',
    defaultMessage: 'Glider is live on mainnet!',
  },
  inputPlaceholder: {
    id: 'pages.Website.HomePage.Hero.inputPlaceholder',
    defaultMessage: 'Need help getting started?',
  },
  buttonSubmit: {
    id: 'pages.Website.HomePage.Hero.buttonSubmit',
    defaultMessage: 'Get in touch',
  },
  buttonGetStarted: {
    id: 'pages.Website.HomePage.Hero.buttonGetStarted',
    defaultMessage: 'Get Started',
  },
});

const displayName = 'pages.Website.HomePage.Hero';

const Hero = () => {
  const { headerHeight } = useContext(ThemeContext);
  const style = headerHeight ? { paddingTop: `${headerHeight}px` } : {};

  const handleSubmit = useCallback((email: string) => {
    // $FlowFixMe - flow type state below
    navigate(PAGE_GET_EARLY_ACCESS, { state: { email } });
  }, []);

  return (
    <div className={styles.main}>
      <SEO description={MSG.description} title={MSG.title} />
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
              appearance={{ size: 'medium', theme: 'invert' }}
              text={MSG.description}
            />
            <Button
              appearance={{
                borderRadius: 'none',
                size: 'large',
                theme: 'primary',
              }}
              className={styles.button}
              linkTo={COLONY_APP}
              text={MSG.buttonGetStarted}
            />
          </div>
        </div>
        <InputGroup
          buttonText={MSG.buttonSubmit}
          id={`${displayName}.earlyAccess`}
          onSubmit={handleSubmit}
          placeholder={MSG.inputPlaceholder}
          type="email"
        />
      </div>
    </div>
  );
};

Hero.displayName = displayName;

export default Hero;
