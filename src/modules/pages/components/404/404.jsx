/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';
import { Match } from '@reach/router';

import Heading from '~core/Heading';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import DeveloperPortalLayout from '~layouts/DeveloperPortalLayout';
import WebsiteLayout from '~layouts/WebsiteLayout';
import SEO from '~parts/SEO';
import { DOCS_COLONY_NETWORK, PAGE_DEV_DOCS, PAGE_INDEX } from '~routes';

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
  linkDevPortalHome: {
    id: 'pages.NotFoundPage.linkDevPortalHome',
    defaultMessage: 'Developer Portal Home',
  },
  linkHome: {
    id: 'pages.NotFoundPage.linkHome',
    defaultMessage: 'Home',
  },
});

const displayName = 'pages.NotFoundPage';

const NotFoundPage = () => (
  <Match path={`${PAGE_DEV_DOCS}/*`}>
    {({ match }) =>
      match ? (
        <DeveloperPortalLayout>
          <SEO description={MSG.contentExplanation} title={MSG.title} />
          <main className={styles.main}>
            <div className={styles.content}>
              <Heading text={MSG.title} />
              <Paragraph
                appearance={{ size: 'medium' }}
                text={MSG.contentExplanation}
              />
              <Link href={DOCS_COLONY_NETWORK} text={MSG.linkDevPortalHome} />
            </div>
          </main>
        </DeveloperPortalLayout>
      ) : (
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
      )
    }
  </Match>
);

NotFoundPage.displayName = displayName;

export default NotFoundPage;
