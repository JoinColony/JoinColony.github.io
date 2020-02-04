/* @flow */

import React, { useContext } from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Announcement from '~core/Announcement';
import Breakpoint from '~core/Breakpoint';
import Button from '~core/Button';
import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';
import ThemeContext from '~layouts/WebsiteLayout/context';
import SEO from '~parts/SEO';
import { COLONY_APP } from '~routes';

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
              <Button
                appearance={{
                  borderRadius: 'none',
                  size: 'large',
                  theme: 'primary',
                }}
                className={styles.button}
                linkTo={COLONY_APP}
                text={MSG.buttonText}
              />
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
