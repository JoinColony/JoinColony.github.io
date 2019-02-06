/* @flow */
import React from 'react';

import Link from '~core/Link';

import styles from './404.module.css';

const displayName = 'pages.NotFoundPage';

const NotFoundPage = () => (
  <main className={styles.main}>
    <div className={styles.content}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link href="/">Home</Link>
    </div>
  </main>
);

NotFoundPage.displayName = displayName;

export default NotFoundPage;
