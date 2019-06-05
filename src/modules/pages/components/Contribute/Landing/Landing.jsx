/* @flow */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Issue from './Issue';

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
  issuesDescription: {
    id: 'pages.Contribute.Landing.issuesDescription',
    defaultMessage: `Find issues labeled “Help wanted” and "Good First Issue"
    below or check out the repository to open a new issue or pull request.`,
  },
  issuesTitle: {
    id: 'pages.Contribute.Landing.issuesTitle',
    defaultMessage: 'Start Contributing',
  },
  ongoingDescription: {
    id: 'pages.Contribute.Landing.ongoingDescription',
    defaultMessage: `Looking for some other ideas? Here are some ongoing ways to
    contribute.`,
  },
  ongoingTitle: {
    id: 'pages.Contribute.Landing.ongoingTitle',
    defaultMessage: 'More ways to contribute',
  },
});

const displayName = 'pages.Contribute.Landing';

const Landing = () => {
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
    <div className={styles.main}>
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
              theme: 'contribute',
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
          <FormattedMessage {...MSG.issuesTitle} />
        </h1>
        <p className={styles.description}>
          <FormattedMessage {...MSG.issuesDescription} />
        </p>
        <table className={styles.issues}>
          <thead>
            <tr>
              <td>Date</td>
              <td>Title</td>
              <td>Link</td>
              <td>Reward</td>
            </tr>
          </thead>
          <tbody>
            {issues &&
              issues.map(issue => <Issue key={issue.node.url} issue={issue} />)}
          </tbody>
        </table>
      </div>
      <div className={styles.section}>
        <h1 className={styles.title}>
          <FormattedMessage {...MSG.ongoingTitle} />
        </h1>
        <p className={styles.description}>
          <FormattedMessage {...MSG.ongoingDescription} />
        </p>
        <table className={styles.issues}>
          <tbody>
            <tr>
              <td style={{ paddingLeft: '50px', width: '250px' }}>
                Report Bugs
              </td>
              <td>
                Are you encountering any bugs while developing with our tools?
                Help us out by opening an issue describing the bug.
              </td>
            </tr>
            <tr>
              <td style={{ paddingLeft: '50px', width: '250px' }}>
                Improve Documentation
              </td>
              <td>
                We could always use some help improving our documentation and
                fixing anything that might be outdated.
              </td>
            </tr>
            <tr>
              <td style={{ paddingLeft: '50px', width: '250px' }}>
                Another Way
              </td>
              <td>
                We are pretty open to ideas. Let us know what you got cookin on
                the backburner.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Landing.displayName = displayName;

export default Landing;
