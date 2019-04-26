/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';
import DeveloperPortalLayout from '~layouts/DeveloperPortalLayout';
import { PAGE_INDEX } from '~routes';

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
  <DeveloperPortalLayout>
    <main className={styles.main}>
      <div className={styles.content}>
        <Heading text={MSG.title} />
        <p>
          <FormattedMessage {...MSG.contentExplanation} />
        </p>
        <Link href={PAGE_INDEX} text={MSG.linkHome} />
      </div>
    </main>
  </DeveloperPortalLayout>
);

NotFoundPage.displayName = displayName;

export default NotFoundPage;
