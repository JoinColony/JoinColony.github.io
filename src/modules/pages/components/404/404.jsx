/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import WebsiteLayout from '~layouts/WebsiteLayout';
import SEO from '~parts/SEO';
import { PAGE_INDEX } from '~routes';

import styles from './404.module.css';

const MSG = defineMessages({
  contentExplanation: {
    id: 'pages.NotFoundPage.contentExplanation',
    defaultMessage: `You just hit a route that doesn't exist... the sadness.`,
  },
  title: {
    id: 'pages.NotFoundPage.title',
    defaultMessage: 'Not Found',
  },
  linkHome: {
    id: 'pages.NotFoundPage.linkHome',
    defaultMessage: 'Home',
  },
});

const displayName = 'pages.NotFoundPage';

const NotFoundPage = () => (
  <WebsiteLayout>
    <SEO description={MSG.contentExplanation} title={MSG.title} />
    <main className={styles.main}>
      <div className={styles.content}>
        <Heading text={MSG.title} />
        <Paragraph
          appearance={{ size: 'medium' }}
          text={MSG.contentExplanation}
        />
        <Link href={PAGE_INDEX} text={MSG.linkHome} />
      </div>
    </main>
  </WebsiteLayout>
);

NotFoundPage.displayName = displayName;

export default NotFoundPage;
