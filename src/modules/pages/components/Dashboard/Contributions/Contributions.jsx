/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { User } from '~types';

import IssueTableRow from '~parts/IssueTableRow';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './Contributions.module.css';

const MSG = defineMessages({
  buttonRequestReward: {
    id: 'pages.Dashboard.Contributions.buttonRequestReward',
    defaultMessage: '+ Request Reward',
  },
  buttonCancel: {
    id: 'pages.Dashboard.Contributions.buttonCancel',
    defaultMessage: 'Cancel',
  },
  description: {
    id: 'pages.Dashboard.Contributions.description',
    defaultMessage: 'A list of your contributions to JoinColony.',
  },
  contributionsHeaderDate: {
    id: 'pages.Contribute.Landing.contributionsHeaderDate',
    defaultMessage: 'Date',
  },
  contributionsHeaderLink: {
    id: 'pages.Contribute.Landing.contributionsHeaderLink',
    defaultMessage: 'Link',
  },
  contributionsHeaderReward: {
    id: 'pages.Contribute.Landing.contributionsHeaderReward',
    defaultMessage: 'Reward',
  },
  contributionsHeaderTitle: {
    id: 'pages.Contribute.Landing.contributionsHeaderTitle',
    defaultMessage: 'Title',
  },
  title: {
    id: 'pages.Dashboard.Contributions.title',
    defaultMessage: 'Contributions List',
  },
});

type Props = {|
  path: string,
  user: User,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Contributions';

const Contributions = ({ user }: Props) => {
  const [error, setError] = useState(null);
  const [issues, setIssues] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorTimeout = useRef(null);

  useEffect(() => {
    if (!loadedLocal) {
      const localUserIssues = getStore('userIssues');
      setIssues(localUserIssues);
      setLoadedLocal(true);
    }
  }, [issues, loadedLocal]);

  useEffect(() => setStore('userIssues', issues), [issues]);

  const getIssues = useCallback(() => {
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
            query: "org:JoinColony author:${user.github.username}",
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
                ... on PullRequest {
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
        setIssues(data.search.edges);
        setLoading(false);
      })
      .catch(fetchError => {
        setError(fetchError.message);
        errorTimeout.current = setTimeout(() => {
          setError(null);
        }, 2000);
      });
  }, [user.github.username]);

  useEffect(() => {
    if (!issues && !loading) {
      getIssues();
    }
    return () => {
      if (error) clearTimeout(errorTimeout.current);
    };
  }, [issues, error, getIssues, loading]);

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>
          <FormattedMessage {...MSG.title} />
        </h1>
        <p className={styles.subTitle}>
          <FormattedMessage {...MSG.description} />
        </p>
        <div className={styles.content}>
          <table className={styles.issues}>
            <thead>
              <tr>
                <td>
                  <FormattedMessage {...MSG.contributionsHeaderDate} />
                </td>
                <td>
                  <FormattedMessage {...MSG.contributionsHeaderTitle} />
                </td>
                <td>
                  <FormattedMessage {...MSG.contributionsHeaderLink} />
                </td>
                <td>
                  <FormattedMessage {...MSG.contributionsHeaderReward} />
                </td>
              </tr>
            </thead>
            <tbody>
              {issues &&
                issues.map(issue => (
                  <IssueTableRow key={issue.node.url} issue={issue} />
                ))}
            </tbody>
          </table>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </>
  );
};

Contributions.displayName = displayName;

export default Contributions;
