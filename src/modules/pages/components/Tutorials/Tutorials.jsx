/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages } from 'react-intl';
import Helmet from 'react-helmet';

import { graphql, useStaticQuery } from 'gatsby';

import type { TutorialNode } from '~types';

import Button from '~core/Button';
import Heading from '~core/Heading';
import Link from '~core/Link';
import Search from '~core/Search';
import SEO from '~parts/SEO';
import SupportCta from '~parts/SupportCta';
import { COLONY_GITHUB_TUTORIALS } from '~routes';

import styles from './Tutorials.module.css';

const MSG = defineMessages({
  btnClearSearch: {
    id: 'pages.Tutorials.btnClearSearch',
    defaultMessage: 'Clear Search',
  },
  btnWriteTutorial: {
    id: 'pages.Tutorials.btnWriteTutorial',
    defaultMessage: 'Write a Tutorial',
  },
  pageDescription: {
    id: 'pages.Tutorials.pageDescription',
    defaultMessage: 'Tutorials using the Colony protocol.',
  },
  pageTitle: {
    id: 'pages.Tutorials.pageTitle',
    defaultMessage: 'Explore Tutorials',
  },
  pageSubtitle: {
    id: 'pages.Tutorials.pageSubtitle',
    defaultMessage: 'Tutorials',
  },
  searchPlaceholder: {
    id: 'pages.Tutorials.searchPlaceholder',
    defaultMessage: 'Search tutorials',
  },
});

type QueryData = {
  allTutorials: {
    edges: Array<{
      node: TutorialNode,
    }>,
  },
};

type Props = {|
  /** Injected via `injectIntl` */
  intl: IntlShape,
|};

const displayName = 'pages.Tutorials';

const Tutorials = ({ intl: { formatMessage } }: Props) => {
  const title = formatMessage(MSG.pageSubtitle);
  const tutorialsQueryData: QueryData = useStaticQuery(graphql`
    {
      ...allTutorialsFragment
    }
  `);
  return (
    <>
      <SEO description={MSG.pageDescription} title={title} />
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={styles.metaContainer}>
        <Heading
          appearance={{ size: 'large', theme: 'dark' }}
          text={MSG.pageTitle}
        />
        <div className={styles.searchContainer}>
          <Search
            inputId="pagesTutorialsSearch"
            placeholderText={MSG.searchPlaceholder}
          />
        </div>
      </div>
      <div className={styles.tutorialsContainer}>
        <div className={styles.tutorialsContainerMeta}>
          <Heading
            appearance={{
              margin: 'none',
              size: 'large',
              theme: 'dark',
              weight: 'medium',
            }}
            text={MSG.pageSubtitle}
          />
          <div className={styles.tutorialsActions}>
            <div className={styles.totorialsActionItem}>
              <Button
                linkTo={COLONY_GITHUB_TUTORIALS}
                text={MSG.btnWriteTutorial}
              />
            </div>
          </div>
        </div>
        <div className={styles.tutorialList}>
          {tutorialsQueryData.allTutorials.edges.map(
            ({
              node: {
                fields: { slug },
                name,
              },
            }) => (
              <Link href={slug} key={slug}>
                <div className={styles.tutorialListItem}>
                  <p>{name}</p>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
      <SupportCta />
    </>
  );
};

Tutorials.displayName = displayName;

export default Tutorials;
