/* @flow */

import type { IntlShape } from 'react-intl';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import SEO from '~parts/SEO';

import Issue from './Issue';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './Contribute.module.css';

const MSG = defineMessages({
  pageDescription: {
    id: 'pages.Contribute.pageDescription',
    defaultMessage: `A list of open issues that developers can work on to earn
    tokens and reputation.`,
  },
  pageTitle: {
    id: 'pages.Contribute.pageTitle',
    defaultMessage: 'Contribute',
  },
  mainTitle: {
    id: 'pages.Contribute.mainTitle',
    defaultMessage: 'Issues labeled "help-wanted"...',
  },
});

type Props = {|
  intl: IntlShape,
|};

const displayName = 'pages.Contribute';

const Contribute = ({ intl: { formatMessage } }: Props) => {
  const title = formatMessage(MSG.pageTitle);
  const [issues, setIssues] = useState(null);
  const [error, setError] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorTimeout = useRef(null);

  useEffect(() => {
    if (!loadedLocal) {
      const localContributions = getStore('issues');
      setIssues(localContributions);
      setLoadedLocal(true);
    }
  }, [issues, loadedLocal]);

  useEffect(() => setStore('issues', issues), [issues]);

  const getContributions = useCallback(() => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DOCS_GITHUB_TOKEN || ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          search(
            query: "org:JoinColony is:open is:issue label:help-wanted",
            type: ISSUE,
            last: 10
          ) {
            edges {
              node {
                ... on Issue {
                  url
                  title
                  createdAt
                }
              }
            }
          }
        }`,
      }),
    };
    // eslint-disable-next-line no-undef
    fetch('https://api.github.com/graphql', options)
      .then(res => res.json())
      .then(({ data }) => {
        setIssues(data.search.edges.filter(({ node }) => node.createdAt));
        setLoading(false);
      })
      .catch(fetchError => {
        setError(fetchError.message);
        errorTimeout.current = setTimeout(() => {
          setError(null);
        }, 2000);
      });
  }, []);

  useEffect(() => {
    if (!issues && !loading) {
      getContributions();
    }
    return () => {
      if (error) clearTimeout(errorTimeout.current);
    };
  }, [issues, error, getContributions, loading]);

  return (
    <>
      <SEO description={MSG.pageDescription} title={title} />
      {/*
        Helmet title must be a prop to work with react hooks.
        See https://github.com/nfl/react-helmet/issues/437
      */}
      <Helmet title={title} />
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>
            <FormattedMessage {...MSG.mainTitle} />
          </h1>
          <table className={styles.issues}>
            <thead>
              <tr>
                <td>Created At</td>
                <td>Issue Title</td>
                <td>Issue Link</td>
                <td>Task</td>
              </tr>
            </thead>
            <tbody>
              {issues &&
                issues.map(issue => (
                  <Issue key={issue.node.url} issue={issue} />
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

Contribute.displayName = displayName;

export default Contribute;
