/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';
import MainLayout from '~layouts/MainLayout';

import styles from './404.module.css';

const MSG = defineMessages({
  contentExplanation: {
    id: 'pages.NotFoundPage.contentExplanation',
    defaultMessage: `You just hit a route that doesn't exist... the sadness.`,
  },
  title: {
    id: 'pages.NotFoundPage.title',
    defaultMessage: 'NOT FOUND',
  },
  linkHome: {
    id: 'pages.NotFoundPage.linkHome',
    defaultMessage: 'Home',
  },
});

const displayName = 'pages.NotFoundPage';

const NotFoundPage = () => (
  <MainLayout>
    <main className={styles.main}>
      <div className={styles.content}>
        <Heading text={MSG.title} />
        <p>
          <FormattedMessage {...MSG.contentExplanation} />
        </p>
        <Link href="/" text={MSG.linkHome} />
      </div>
    </main>
  </MainLayout>
);

NotFoundPage.displayName = displayName;

export default NotFoundPage;
