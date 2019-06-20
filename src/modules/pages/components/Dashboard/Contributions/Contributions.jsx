/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Network, User } from '~types';

import ErrorMessage from '~core/ErrorMessage';
import Image from '~core/Image';
import Link from '~core/Link';

import IssueTableRow from '~parts/IssueTableRow';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import { PAGE_DEVELOPER_PORTAL_CONTRIBUTE } from '~routes';

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
    defaultMessage: 'A list of your contributions to {joinColonyLink}.',
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
  noContributionsLink: {
    id: 'pages.Dashboard.Contributions.noContributionsLink',
    defaultMessage: 'start earning tokens and reputation',
  },
  noContributionsMessage: {
    id: 'pages.Dashboard.Contributions.noContributionsMessage',
    defaultMessage: `It looks like you don't have any past contributions. Make
    your first contribution and {noContributionsLink}.`,
  },
  noContributionsTitle: {
    id: 'pages.Dashboard.Contributions.noContributionsTitle',
    defaultMessage: 'Contribute and Earn',
  },
  title: {
    id: 'pages.Dashboard.Contributions.title',
    defaultMessage: 'Contributions',
  },
});

type Props = {|
  network: Network,
  path: string,
  user: User,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Contributions';

const Contributions = ({ network, user }: Props) => {
  const [error, setError] = useState(null);
  const [issues, setIssues] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [loadedRemote, setLoadedRemote] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loadedLocal) {
      const localUserIssues = getStore('userIssues');
      setIssues(localUserIssues);
      setLoadedLocal(true);
    }
  }, [issues, loadedLocal]);

  useEffect(() => setStore('userIssues', issues), [issues]);

  const getIssues = useCallback(() => {
    setError(null);
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
        setLoadedRemote(true);
        setLoading(false);
      })
      .catch(fetchError => {
        setError(fetchError.message);
      });
  }, [user.github.username]);

  useEffect(() => {
    if (!issues && !loading) {
      getIssues();
    }
  }, [issues, getIssues, loading]);

  if (!issues && !loading) {
    return (
      <div className={styles.noContributions}>
        <div className={styles.noContributionsWrapper}>
          <div>
            <Image
              alt={MSG.noContributionsTitle}
              className={styles.noContributionsImage}
              src="/img/no_contributions.svg"
            />
            <h1 className={styles.title}>
              <FormattedMessage {...MSG.noContributionsTitle} />
            </h1>
            <p className={styles.subTitle}>
              <FormattedMessage
                values={{
                  noContributionsLink: (
                    <Link
                      href={PAGE_DEVELOPER_PORTAL_CONTRIBUTE}
                      text={MSG.noContributionsLink}
                    />
                  ),
                }}
                {...MSG.noContributionsMessage}
              />
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>
          <FormattedMessage {...MSG.title} />
        </h1>
        <p className={styles.subTitle}>
          <FormattedMessage
            values={{
              joinColonyLink: (
                <Link href="https://github.com/joincolony" text="JoinColony" />
              ),
            }}
            {...MSG.description}
          />
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
                  <IssueTableRow
                    key={issue.node.url}
                    issue={issue}
                    loadedRemote={loadedRemote}
                    network={network}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {error && <ErrorMessage error={error} />}
      </div>
    </>
  );
};

Contributions.displayName = displayName;

export default Contributions;
