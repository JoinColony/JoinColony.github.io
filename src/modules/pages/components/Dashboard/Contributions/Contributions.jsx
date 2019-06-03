/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { User } from '~types';

import Button from '~core/Button';
import Link from '~core/Link';

import RequestReward from './RequestReward';

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
  const [contributions, setContributions] = useState(null);
  const [error, setError] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestReward, setRequestReward] = useState(false);
  const errorTimeout = useRef(null);

  useEffect(() => {
    if (!loadedLocal) {
      const localContributions = getStore('contributions');
      setContributions(localContributions);
      setLoadedLocal(true);
    }
  }, [contributions, loadedLocal]);

  useEffect(() => setStore('contributions', contributions), [contributions]);

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
        setContributions(data.search.edges);
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
    if (!contributions && !loading) {
      getContributions();
    }
    return () => {
      if (error) clearTimeout(errorTimeout.current);
    };
  }, [contributions, error, getContributions, loading]);

  const formatContributionLink = url => {
    const repository = url.split('/')[4];
    const pullRequestNumber = url.split('/')[6];
    return `${repository}#${pullRequestNumber}`;
  };

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
          <div className={styles.requestRewardButton}>
            {requestReward ? (
              <Button
                appearance={{
                  theme: 'reset',
                  color: 'grey',
                }}
                onClick={() => setRequestReward(false)}
                text={MSG.buttonCancel}
                type="submit"
              />
            ) : (
              <Button
                appearance={{
                  theme: 'reset',
                  color: 'blue',
                }}
                onClick={() => setRequestReward(true)}
                text={MSG.buttonRequestReward}
                type="submit"
              />
            )}
          </div>
          {requestReward && (
            <RequestReward setRequestReward={setRequestReward} />
          )}
          <table className={styles.contributions}>
            <thead>
              <tr>
                <td>Date</td>
                <td>Title</td>
                <td>Link</td>
                <td>Reward</td>
              </tr>
            </thead>
            <tbody>
              {contributions &&
                contributions.map(contribution => (
                  <tr key={contribution.node.url}>
                    <td>{contribution.node.createdAt.split('T')[0]}</td>
                    <td>{`${contribution.node.title.substring(0, 40)}...`}</td>
                    <td>
                      <Link
                        href={contribution.node.url}
                        text={formatContributionLink(contribution.node.url)}
                      />
                    </td>
                    <td>
                      <i>none</i>
                    </td>
                  </tr>
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
