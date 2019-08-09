/* @flow */

import React, { useContext } from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Announcement from '~core/Announcement';
import Button from '~core/Button';
import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';
import ThemeContext from '~layouts/WebsiteLayout/context';
import { PAGE_GET_EARLY_ACCESS } from '~routes';

import styles from './Hero.module.css';

const MSG = defineMessages({
  announcement: {
    id: 'pages.Website.ProductDapp.Hero.announcement',
    defaultMessage: 'Now live on Ethereum Mainnet!',
  },
  body: {
    id: 'pages.Website.ProductDapp.Hero.body',
    defaultMessage: `Organize your colony into teams, projects,
      departments, or whatever structure suits you.`,
  },
  buttonText: {
    id: 'pages.Website.ProductDapp.Hero.buttonText',
    defaultMessage: 'Get early access',
  },
  subBody: {
    id: 'pages.Website.ProductDapp.Hero.subBody',
    defaultMessage: `Colony’s beta is live on Ethereum mainnet! It’s just
      a baby, so features are limited, but if you’re super keen, and
      committed to helping shape development, we are accepting beta users
      with suitable use cases.`,
  },
  subTitle: {
    id: 'pages.Website.ProductDapp.Hero.subTitle',
    defaultMessage: `Colony’s beta is live on Ethereum mainnet! It
      would be great to have another sentence here to fill this box out.`,
  },
  title: {
    id: 'pages.Website.ProductDapp.Hero.title',
    defaultMessage: `Tools to Organize and Incentivize Collaborators,
      Communities, and Contingent Workers`,
  },
});

const displayName = 'pages.Website.ProductDapp.Hero';

const Hero = () => {
  const { headerHeight } = useContext(ThemeContext);
  const style = headerHeight ? { paddingTop: `${headerHeight}px` } : {};
  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className={styles.imageContainer} style={style}>
          <Image
            alt={MSG.title}
            className={styles.image}
            src={withPrefix('/img/ColonyHome_mockup_half.png')}
          />
        </div>
        <div className={styles.contentContainer} style={style}>
          <div className={styles.contentInner}>
            <Announcement text={MSG.announcement} />
            <Heading
              appearance={{ margin: 'none', theme: 'dark', weight: 'bold' }}
              text={MSG.title}
            />
            <div className={styles.body}>
              <Paragraph appearance={{ size: 'medium' }} text={MSG.body} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.subTitleContainer}>
          <Heading
            appearance={{
              size: 'large',
              theme: 'primary',
              weight: 'medium',
            }}
            text={MSG.subTitle}
          />
        </div>
        <div className={styles.subBodyContainer}>
          <Paragraph appearance={{ size: 'medium' }} text={MSG.subBody} />
          <div className={styles.button}>
            <Button
              appearance={{
                borderRadius: 'none',
                padding: 'huge',
                theme: 'primary',
              }}
              linkTo={PAGE_GET_EARLY_ACCESS}
              text={MSG.buttonText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.displayName = displayName;

export default Hero;
