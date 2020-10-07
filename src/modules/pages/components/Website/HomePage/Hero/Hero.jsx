/* @flow */

import React, { useCallback, useContext } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { navigate } from '@reach/router';

import Announcement from '~core/Announcement';
import Button from '~core/Button';
import Heading from '~core/Heading';
import Image from '~core/Image';
import InputGroup from '~core/InputGroup';
import Paragraph from '~core/Paragraph';
import Popover from '~core/Popover';
import ThemeContext from '~layouts/WebsiteLayout/context';
import SEO from '~parts/SEO';
import { PAGE_CONTACT } from '~routes';

import styles from './Hero.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.HomePage.Hero.title',
    defaultMessage: 'Organizations, for the Internet.',
  },
  description: {
    id: 'pages.Website.HomePage.Hero.description',
    // eslint-disable-next-line max-len
    defaultMessage: `Colony makes it easy for people all over the world to build organizations together, online.`,
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
  tooltipColonyCreationDisabled: {
    id: 'users.CreateColonyWizard.StepColonyName.tooltipColonyCreationDisabled',
    // eslint-disable-next-line max-len
    defaultMessage: `Due to the extraordinarily high Ethereum gas prices, we’ve decided to disable colony creation to prevent new users from incurring unexpectedly high costs. A new and improved Colony V2 will be available on xDai soon!`,
  },
});

const displayName = 'pages.Website.HomePage.Hero';

const Hero = () => {
  const { headerHeight } = useContext(ThemeContext);
  const style = headerHeight ? { paddingTop: `${headerHeight}px` } : {};

  const handleSubmit = useCallback((email: string) => {
    // $FlowFixMe - flow type state below
    navigate(PAGE_CONTACT, { state: { email } });
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
            <span className={styles.docsDropdownParent}>
              <Popover
                appearance={{ theme: 'grey' }}
                content={() => (
                  <div className={styles.colonyCreationDisabled}>
                    <FormattedMessage {...MSG.tooltipColonyCreationDisabled} />
                  </div>
                )}
                /*
                 * `isOpen` is always true for a11y purposes. This ensures the dropdown
                 * menu is always in the DOM, and visibility is controlled via CSS.
                 */
                isOpen
                placement="top"
                popperProps={{
                  modifiers: {
                    offset: {
                      offset: '0, 15px',
                    },
                  },
                }}
                trigger="disabled"
                wrapperClassName={styles.docsDropdownContainer}
              >
                <span>
                  <Button
                    appearance={{
                      borderRadius: 'none',
                      size: 'large',
                      theme: 'primary',
                    }}
                    className={styles.button}
                    text={MSG.buttonGetStarted}
                    disabled
                  />
                </span>
              </Popover>
            </span>
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
