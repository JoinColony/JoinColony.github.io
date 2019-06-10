/* @flow */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Network } from '~types';

import IssueTableRow from '~parts/IssueTableRow';

import Button from '~core/Button';
import Image from '~core/Image';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './Landing.module.css';

const MSG = defineMessages({
  heroButton: {
    id: 'pages.Contribute.Landing.heroButton',
    defaultMessage: 'Create Account',
  },
  heroDescription: {
    id: 'pages.Contribute.Landing.heroDescription',
    defaultMessage: `Create a developer account so we can reward you CDEV tokens
    and reputation for contributing to our open source projects.`,
  },
  heroTitle: {
    id: 'pages.Contribute.Landing.heroTitle',
    defaultMessage: 'Contribute and Earn',
  },
  moreWaysDescription: {
    id: 'pages.Contribute.Landing.moreWaysDescription',
    defaultMessage: `Looking for some other ideas? Here are some more ways to
    contribute.`,
  },
  moreWaysItemBugsDescription: {
    id: 'pages.Contribute.Landing.moreWaysItemBugsDescription',
    defaultMessage: `Are you encountering any bugs while developing with our
    tools? Help us out by opening an issue that describes the bug.`,
  },
  moreWaysItemBugsTitle: {
    id: 'pages.Contribute.Landing.moreWaysItemBugsTitle',
    defaultMessage: 'Report Bugs',
  },
  moreWaysItemDocsDescription: {
    id: 'pages.Contribute.Landing.moreWaysItemDocsDescription',
    defaultMessage: `We could always use some help improving our documentation
    and making sure everything is up-to-date and easy to understand.`,
  },
  moreWaysItemDocsTitle: {
    id: 'pages.Contribute.Landing.moreWaysItemDocsTitle',
    defaultMessage: 'Improve Docs',
  },
  moreWaysItemFeatureDescription: {
    id: 'pages.Contribute.Landing.moreWaysItemFeatureDescription',
    defaultMessage: `Do you have an idea for a new feature? Open an issue with
    your feature request or open a pull request with your feature.`,
  },
  moreWaysItemFeatureTitle: {
    id: 'pages.Contribute.Landing.moreWaysItemFeatureTitle',
    defaultMessage: 'New Feature',
  },
  moreWaysTitle: {
    id: 'pages.Contribute.Landing.moreWaysTitle',
    defaultMessage: 'More ways to contribute',
  },
  openIssuesDescription: {
    id: 'pages.Contribute.Landing.openIssuesDescription',
    defaultMessage: `Find issues labeled “Help wanted” and "Good First Issue"
    below or check out the repository to open a new issue or pull request.`,
  },
  openIssuesHeaderDate: {
    id: 'pages.Contribute.Landing.openIssuesHeaderDate',
    defaultMessage: 'Date',
  },
  openIssuesHeaderLink: {
    id: 'pages.Contribute.Landing.openIssuesHeaderLink',
    defaultMessage: 'Link',
  },
  openIssuesHeaderReward: {
    id: 'pages.Contribute.Landing.openIssuesHeaderReward',
    defaultMessage: 'Reward',
  },
  openIssuesHeaderTitle: {
    id: 'pages.Contribute.Landing.openIssuesHeaderTitle',
    defaultMessage: 'Title',
  },
  openIssuesTitle: {
    id: 'pages.Contribute.Landing.openIssuesTitle',
    defaultMessage: 'Start Contributing',
  },
});

type Props = {|
  network: Network,
  path: string,
|};

const displayName = 'pages.Contribute.Landing';

const Landing = ({ network }: Props) => {
  const [issues, setIssues] = useState(null);
  const [error, setError] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [loadedRemote, setLoadedRemote] = useState(false);
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

  const getIssues = useCallback(() => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        // TODO Use current user authentication token from github
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
        // Remove empty nodes
        const nodes = data.search.edges.filter(({ node }) => node !== {});
        setIssues(nodes);
        setLoadedRemote(true);
        setLoading(false);
      })
      .catch(({ message }) => {
        setError({ message });
        errorTimeout.current = setTimeout(() => {
          setError(null);
        }, 2000);
      });
  }, []);

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
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <FormattedMessage {...MSG.heroTitle} />
          </h1>
          <p className={styles.heroDescription}>
            <FormattedMessage {...MSG.heroDescription} />
          </p>
          <Button
            appearance={{
              theme: 'callToAction',
              padding: 'huge',
              weight: 'medium',
            }}
            linkTo="/dashboard"
            text={MSG.heroButton}
            type="submit"
          />
        </div>
        <Image
          className={styles.heroImage}
          alt={MSG.heroTitle}
          src="/img/devPortal_banner_contribute.svg"
        />
      </div>
      <div className={styles.section}>
        <h1 className={styles.title}>
          <FormattedMessage {...MSG.openIssuesTitle} />
        </h1>
        <p className={styles.description}>
          <FormattedMessage {...MSG.openIssuesDescription} />
        </p>
        <table className={styles.issues}>
          <thead>
            <tr>
              <td>
                <FormattedMessage {...MSG.openIssuesHeaderDate} />
              </td>
              <td>
                <FormattedMessage {...MSG.openIssuesHeaderTitle} />
              </td>
              <td>
                <FormattedMessage {...MSG.openIssuesHeaderLink} />
              </td>
              <td>
                <FormattedMessage {...MSG.openIssuesHeaderReward} />
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
      <div className={styles.section}>
        <h1 className={styles.title}>
          <FormattedMessage {...MSG.moreWaysTitle} />
        </h1>
        <p className={styles.description}>
          <FormattedMessage {...MSG.moreWaysDescription} />
        </p>
        <table className={styles.moreWays}>
          <tbody>
            <tr>
              <td>
                <FormattedMessage {...MSG.moreWaysItemBugsTitle} />
              </td>
              <td>
                <FormattedMessage {...MSG.moreWaysItemBugsDescription} />
              </td>
            </tr>
            <tr>
              <td>
                <FormattedMessage {...MSG.moreWaysItemDocsTitle} />
              </td>
              <td>
                <FormattedMessage {...MSG.moreWaysItemDocsDescription} />
              </td>
            </tr>
            <tr>
              <td>
                <FormattedMessage {...MSG.moreWaysItemFeatureTitle} />
              </td>
              <td>
                <FormattedMessage {...MSG.moreWaysItemFeatureDescription} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

Landing.displayName = displayName;

export default Landing;
