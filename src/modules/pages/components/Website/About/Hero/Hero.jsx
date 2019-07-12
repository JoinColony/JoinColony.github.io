/* @flow */

import React, { useContext } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Announcement from '~core/Announcement';
import Heading from '~core/Heading';
import ThemeContext from '~layouts/WebsiteLayout/context';

import HeroImage from './HeroImage';

import styles from './Hero.module.css';

const MSG = defineMessages({
  announcement: {
    id: 'pages.Website.About.Hero.announcement',
    defaultMessage: 'About the vision',
  },
  title: {
    id: 'pages.Website.About.Hero.title',
    defaultMessage: 'The Rat Race Can{br}Go Fork Itself.',
  },
  body: {
    id: 'pages.Website.About.Hero.body',
    defaultMessage: `A decade ago, it was hard to imagine that,
      today, three times more children aspire to host a YouTube
      channel than become a doctor or nurse; that there would
      be a taxi company employing no drivers worth $82bn, or;
      software, owned by no-one, printing $millions every day
      to pay people to work for it. 
      {br}{br}The world got weird.
      {br}{br}Ideas about work, occupation, and even companies are
      changing. But then, to paraphrase a wise man: “Companies?
      Where we’re going, we don’t need companies.”`,
  },
});

const displayName = 'pages.Website.About.Hero';

const Hero = () => {
  const { headerHeight } = useContext(ThemeContext);
  const style = headerHeight ? { paddingTop: `${headerHeight}px` } : {};
  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <div style={style}>
          <div className={styles.contentContainer}>
            <Announcement text={MSG.announcement} />
            <Heading appearance={{ margin: 'none', theme: 'dark' }}>
              <FormattedMessage {...MSG.title} values={{ br: <br /> }} />
            </Heading>
            <p className={styles.body}>
              <FormattedMessage {...MSG.body} values={{ br: <br /> }} />
            </p>
          </div>
        </div>
        <HeroImage />
      </div>
    </div>
  );
};

Hero.displayName = displayName;

export default Hero;
