/* @flow */

import React, { useContext } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Announcement from '~core/Announcement';
import Button from '~core/Button';
import Heading from '~core/Heading';
import Paragraph from '~core/Paragraph';
import ThemeContext from '~layouts/WebsiteLayout/context';
import SEO from '~parts/SEO';
import { COLONY_APP_BETA_COLONY } from '~routes';

import styles from './Hero.module.css';

const MSG = defineMessages({
  announcement: {
    id: 'pages.Website.AboutMetaColony.Hero.announcement',
    defaultMessage: 'About the Metacolony',
  },
  title: {
    id: 'pages.Website.AboutMetaColony.Hero.title',
    defaultMessage: `Colony Isn't a Company.{br}It's a Colony.`,
  },
  body: {
    id: 'pages.Website.AboutMetaColony.Hero.body',
    defaultMessage: `Colonies come in many shapes and sizes,
      but at their most ambitious, will manifest something
      fundamentally new in the world: internet native organizations
      enabling people to collaborate and manage shared funds
      without needing to trust one another.`,
  },
  buttonText: {
    id: 'pages.Website.AboutMetaColony.Hero.subTitle',
    defaultMessage: 'Say hi',
  },
  subTitle: {
    id: 'pages.Website.AboutMetaColony.Hero.subTitle',
    defaultMessage: `Meet the Metacolony.{br}In fact, join it. There's always
      room for talented people who want to make the world a little more
      awesome.`,
  },
  subBody: {
    id: 'pages.Website.AboutMetaColony.Hero.subBody',
    defaultMessage: `The Colony Network is designed as a
      self-sustaining public utility: a digital commons available
      to all, in which permission isn't needed and censorship not
      possible. We think of it as infrastructure for next gen firms.
      {br}{br}
      Nevertheless, infrastructure requires upkeep. Ongoing management
      and development will be needed to support the growth of a thriving
      ecosystem. The Metacolony is the colony responsible for that
      important work. Every colony needs the Metacolony, anyone may
      contribute, and it will be opening for business real soon.
      {br}{br}
      The Metacolony will launch under the aegis of Colony Foundation
      Ltd., which will gradually cede control to the Metacolony's members.`,
  },
  seoTitle: {
    id: 'pages.Website.AboutMetaColony.Hero.seoTitle',
    defaultMessage: `Colony isn't a company. It's a colony.`,
  },
});

const displayName = 'pages.Website.AboutMetaColony.Hero';

const Hero = () => {
  const { headerHeight } = useContext(ThemeContext);
  const style = headerHeight ? { paddingTop: `${headerHeight}px` } : {};
  return (
    <div className={styles.main}>
      <SEO description={MSG.body} title={MSG.seoTitle} />
      <div className={styles.row}>
        <div className={styles.imageContainer} style={style} />
        <div className={styles.contentContainer} style={style}>
          <div className={styles.contentInner}>
            <Announcement text={MSG.announcement} />
            <Heading appearance={{ margin: 'none', theme: 'dark' }}>
              <FormattedMessage {...MSG.title} values={{ br: <br /> }} />
            </Heading>
            <div className={styles.body}>
              <Paragraph
                appearance={{ margin: 'none', size: 'medium' }}
                text={MSG.body}
              />
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
          >
            <FormattedMessage {...MSG.subTitle} values={{ br: <br /> }} />
          </Heading>
          <Button
            appearance={{
              borderRadius: 'none',
              padding: 'huge',
              theme: 'primary',
            }}
            linkTo={COLONY_APP_BETA_COLONY}
            text={MSG.buttonText}
          />
        </div>
        <div className={styles.subBodyContainer}>
          <Paragraph appearance={{ margin: 'none' }} text={MSG.subBody} />
        </div>
      </div>
    </div>
  );
};

Hero.displayName = displayName;

export default Hero;
