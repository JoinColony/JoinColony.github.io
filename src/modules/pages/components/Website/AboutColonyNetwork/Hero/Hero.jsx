/* @flow */

import React, { useContext } from 'react';
import { defineMessages } from 'react-intl';

import type { Project } from '~types';

import Announcement from '~core/Announcement';
import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';
import ThemeContext from '~layouts/WebsiteLayout/context';
import { PAGE_ANCHOR_ABOUT_COLONY_NETWORK_CAPABILITIES } from '~routes';
import SEO from '~parts/SEO';

import styles from './Hero.module.css';

const MSG = defineMessages({
  announcement: {
    id: 'pages.Website.AboutColonyNetwork.Hero.announcement',
    defaultMessage: 'About colonyNetwork',
  },
  title: {
    id: 'pages.Website.AboutColonyNetwork.Hero.title',
    defaultMessage: 'An Operating System for Organizations',
  },
  body: {
    id: 'pages.Website.AboutColonyNetwork.Hero.body',
    defaultMessage: `The Colony Network is a suite of smart
      contracts, running on Ethereum. It provides a general
      purpose framework for the essential functions
      organizations require, such as ownership, structure,
      authority, and financial management.`,
  },
  subTitle: {
    id: 'pages.Website.AboutColonyNetwork.Hero.subTitle',
    defaultMessage: 'Colony Network Capabilities',
  },
  subBody: {
    id: 'pages.Website.AboutColonyNetwork.Hero.subBody',
    defaultMessage: `Every organization is different, so like a
      computer's operating system, the Colony Network is use-case
      agnostic, enabling organizations to customize their Colony
      with smart contract modules providing the rules their
      organization requires.`,
  },
});

type Props = {|
  project: Project,
|};

const displayName = 'pages.Website.AboutColonyNetwork.Hero';

const Hero = ({ project: { name, logoSmall } }: Props) => {
  const { headerHeight } = useContext(ThemeContext);
  const style = headerHeight ? { paddingTop: `${headerHeight}px` } : {};
  return (
    <div className={styles.main}>
      <SEO description={MSG.body} title={MSG.title} />
      <div className={styles.row}>
        <div className={styles.imageContainer} style={style}>
          <div className={styles.imageInner}>
            <Image
              alt={name}
              className={styles.image}
              project={name}
              src={logoSmall}
            />
          </div>
        </div>
        <div className={styles.contentContainer} style={style}>
          <div className={styles.contentInner}>
            <Announcement text={MSG.announcement} />
            <Heading
              appearance={{ margin: 'none', theme: 'dark' }}
              text={MSG.title}
            />
            <div className={styles.body}>
              <Paragraph appearance={{ margin: 'none' }} text={MSG.body} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div
          className={styles.subTitleContainer}
          id={PAGE_ANCHOR_ABOUT_COLONY_NETWORK_CAPABILITIES}
        >
          <Heading
            appearance={{
              margin: 'none',
              size: 'huge',
              theme: 'dark',
            }}
            text={MSG.subTitle}
          />
        </div>
        <div className={styles.subBodyContainer}>
          <Paragraph
            appearance={{ margin: 'none', size: 'medium' }}
            text={MSG.subBody}
          />
        </div>
      </div>
    </div>
  );
};

Hero.displayName = displayName;

export default Hero;
