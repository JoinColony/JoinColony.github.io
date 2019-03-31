/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages } from 'react-intl';
import { Helmet } from 'react-helmet';

import SEO from '~parts/SEO';
import SupportCta from '~parts/SupportCta';

import CoreProducts from './CoreProducts';
import Hero from './Hero';
import OpenSource from './OpenSource';

import styles from './Developers.module.css';

const MSG = defineMessages({
  pageDescription: {
    id: 'pages.Developers.pageDescription',
    defaultMessage: `Just like the organizations that will run on Colony,
each component in the colony stack is the product of collaboration and open
engagement. Here, you'll find the up-to-date documentation for all of the
Colony projects.`,
  },
  pageTitle: {
    id: 'pages.Developers.pageTitle',
    defaultMessage: 'Developer Portal',
  },
});

type Props = {|
  /** Injected via `injectIntl` */
  intl: IntlShape,
|};

const displayName = 'pages.Developers';

const Developers = ({ intl: { formatMessage } }: Props) => {
  const title = formatMessage(MSG.pageTitle);
  return (
    <>
      <SEO description={MSG.pageDescription} title={title} />
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className={styles.main}>
        <Hero />
        <CoreProducts />
        <OpenSource />
        <SupportCta />
      </main>
    </>
  );
};

Developers.displayName = displayName;

export default Developers;
