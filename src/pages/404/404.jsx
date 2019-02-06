/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import MainLayout from '~layouts/MainLayout';
import Link from '~core/Link';

import styles from './404.module.css';

const MSG = defineMessages({
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
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link href="/" text={MSG.linkHome} />
      </div>
    </main>
  </MainLayout>
);

NotFoundPage.displayName = displayName;

export default NotFoundPage;
