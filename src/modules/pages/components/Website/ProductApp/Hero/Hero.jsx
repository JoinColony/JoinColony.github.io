/* @flow */

import React, { useContext } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { withPrefix } from 'gatsby';

import Announcement from '~core/Announcement';
import Breakpoint from '~core/Breakpoint';
import Button from '~core/Button';
import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';
import Popover from '~core/Popover';
import ThemeContext from '~layouts/WebsiteLayout/context';
import SEO from '~parts/SEO';

import styles from './Hero.module.css';

const MSG = defineMessages({
  announcement: {
    id: 'pages.Website.ProductApp.Hero.announcement',
    defaultMessage: 'Now live on Ethereum Mainnet!',
  },
  body: {
    id: 'pages.Website.ProductApp.Hero.body',
    defaultMessage: `Organize your colony into teams, projects,
      departments, or whatever structure suits you.`,
  },
  title: {
    id: 'pages.Website.ProductApp.Hero.title',
    defaultMessage: `Tools to Organize and Incentivize Collaborators,
      Contributors, and Communities.`,
  },
  buttonText: {
    id: 'pages.Website.ProductApp.Hero.buttonText',
    defaultMessage: 'Get Started',
  },
  tooltipColonyCreationDisabled: {
    id: 'users.CreateColonyWizard.StepColonyName.tooltipColonyCreationDisabled',
    // eslint-disable-next-line max-len
    defaultMessage: `Due to the extraordinarily high Ethereum gas prices, we’ve decided to disable colony creation to prevent new users from incurring unexpectedly high costs. A new and improved Colony V2 will be available on xDai soon!`,
  },
});

const displayName = 'pages.Website.ProductApp.Hero';

const Hero = () => {
  const { headerHeight } = useContext(ThemeContext);
  const style = headerHeight ? { paddingTop: `${headerHeight}px` } : {};
  return (
    <div className={styles.main}>
      <SEO description={MSG.body} title={MSG.title} />
      <div className={styles.row}>
        <Breakpoint size="medium">
          <div className={styles.imageContainer} style={style}>
            <Image
              alt={MSG.title}
              className={styles.image}
              src={withPrefix('/img/ColonyHome_mockup_half.png')}
            />
          </div>
        </Breakpoint>
        <div className={styles.contentContainer} style={style}>
          <div className={styles.contentInner}>
            <Announcement text={MSG.announcement} />
            <Heading
              appearance={{ margin: 'none', theme: 'dark' }}
              text={MSG.title}
            />
            <div className={styles.body}>
              <Paragraph appearance={{ size: 'medium' }} text={MSG.body} />
              <span className={styles.docsDropdownParent}>
                <Popover
                  appearance={{ theme: 'dark' }}
                  content={() => (
                    <div className={styles.colonyCreationDisabled}>
                      <FormattedMessage
                        {...MSG.tooltipColonyCreationDisabled}
                      />
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
                      text={MSG.buttonText}
                      disabled
                    />
                  </span>
                </Popover>
              </span>
            </div>
          </div>
        </div>
        <Breakpoint inclusion="down" size="small">
          <div className={styles.mobileImageContainer} style={style}>
            <Image
              alt={MSG.title}
              className={styles.mobileImage}
              src={withPrefix('/img/ColonyHome_mockup.png')}
            />
          </div>
        </Breakpoint>
      </div>
    </div>
  );
};

Hero.displayName = displayName;

export default Hero;
