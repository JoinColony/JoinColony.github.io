/* @flow */

import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Network } from '~types';

import ErrorMessage from '~core/ErrorMessage';
import IssueTableRow from '~parts/IssueTableRow';
import Button from '~core/Button';
import Image from '~core/Image';

import Questions from './Questions';

import {
  COLONY_GITHUB_OPEN_ISSUES,
  PAGE_DEVELOPER_PORTAL_DASHBOARD,
} from '~routes';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './Landing.module.css';

const MSG = defineMessages({
  contributeTitle: {
    id: 'pages.Contribute.Landing.contributeTitle',
    defaultMessage: 'Start Contributing',
  },
  faqTitle: {
    id: 'pages.Contribute.Landing.faqTitle',
    defaultMessage: 'Frequently Asked Questions',
  },
  heroButton: {
    id: 'pages.Contribute.Landing.heroButton',
    defaultMessage: 'Get Started',
  },
  heroDescription: {
    id: 'pages.Contribute.Landing.heroDescription',
    defaultMessage: `Get rewarded for contributing to and maintaining the Colony
    Developer Portal. Each successful contribution earns you CDEV tokens,
    reputation, and a say in future decisions.`,
  },
  heroTitle: {
    id: 'pages.Contribute.Landing.heroTitle',
    defaultMessage: 'Contribute and Earn',
  },
  overviewStep1: {
    id: 'pages.Contribute.Landing.overviewStep1',
    defaultMessage: '1. Create an account',
  },
  overviewStep1Description: {
    id: 'pages.Contribute.Landing.overviewStep1Description',
    defaultMessage: `Click here, link your GitHub account, and you’re all set.
    We need this so we can send your sweet, sweet rewards.`,
  },
  overviewStep2: {
    id: 'pages.Contribute.Landing.overviewStep2',
    defaultMessage: '2. Make a contribution',
  },
  overviewStep2Description: {
    id: 'pages.Contribute.Landing.overviewStep2Description',
    defaultMessage: `Work on a “Help Wanted” issue, report a bug, write a
    tutorial, or more. There are plenty of ways to get involved.`,
  },
  overviewStep3: {
    id: 'pages.Contribute.Landing.overviewStep3',
    defaultMessage: '3. Get rewarded',
  },
  overviewStep3Description: {
    id: 'pages.Contribute.Landing.overviewStep3Description',
    defaultMessage: `All approved contributions are rewarded with tokens and
    reputation. Check your account page to see your current score!`,
  },
  moreWaysDescription: {
    id: 'pages.Contribute.Landing.moreWaysDescription',
    defaultMessage: `Didn’t see any opportunities above? All good, there are
    more ways to contribute.`,
  },
  moreWaysItemBugsDescription: {
    id: 'pages.Contribute.Landing.moreWaysItemBugsDescription',
    defaultMessage: `Found a bug? Help us squash it. Open an issue and describe
    the problem. The more details, the better.`,
  },
  moreWaysItemBugsTitle: {
    id: 'pages.Contribute.Landing.moreWaysItemBugsTitle',
    defaultMessage: 'Report Bugs',
  },
  moreWaysItemDocsDescription: {
    id: 'pages.Contribute.Landing.moreWaysItemDocsDescription',
    defaultMessage: `Look for the "Improve this doc." section at the bottom of
    each page to make an improvement.`,
  },
  moreWaysItemDocsTitle: {
    id: 'pages.Contribute.Landing.moreWaysItemDocsTitle',
    defaultMessage: 'Documentation',
  },
  moreWaysItemFeatureDescription: {
    id: 'pages.Contribute.Landing.moreWaysItemFeatureDescription',
    defaultMessage: `Do you have an idea for a new feature? Open an issue with
    your feature request or a pull request with your feature.`,
  },
  moreWaysItemFeatureTitle: {
    id: 'pages.Contribute.Landing.moreWaysItemFeatureTitle',
    defaultMessage: 'New Feature',
  },
  moreWaysItemOtherDescription: {
    id: 'pages.Contribute.Landing.moreWaysItemOtherDescription',
    defaultMessage: `Creative ideas abound. Let us know your by posting in
    Discourse or adding an issue to GitHub.`,
  },
  moreWaysItemOtherTitle: {
    id: 'pages.Contribute.Landing.moreWaysItemOtherTitle',
    defaultMessage: 'Something else?',
  },
  moreWaysItemUserStoryDescription: {
    id: 'pages.Contribute.Landing.moreWaysItemUserStoryDescription',
    defaultMessage: `Use-case examples, tutorials, lessons learned—whatever it
    is, we like user stories. Write it up and send it over. `,
  },
  moreWaysItemUserStoryTitle: {
    id: 'pages.Contribute.Landing.moreWaysItemUserStoryTitle',
    defaultMessage: 'User Stories',
  },
  moreWaysTitle: {
    id: 'pages.Contribute.Landing.moreWaysTitle',
    defaultMessage: 'More Ways to Contribute',
  },
  openIssuesDescription: {
    id: 'pages.Contribute.Landing.openIssuesDescription',
    defaultMessage: `The best way to contribute is to work on one of the issues
    below which are open issues labeled “good first issue” or “help wanted” in
    one of our repositories.`,
  },
  openIssuesMoreOpenIssues: {
    id: 'pages.Contribute.Landing.openIssuesMoreOpenIssues',
    defaultMessage: 'More Issues',
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
    defaultMessage: 'Good First Issue / Help Wanted',
  },
  rewardsDescription: {
    id: 'pages.Contribute.Landing.rewardsDescription',
    defaultMessage: `Contributions earn you tokens and reputation in our
    Developer Community. The more you contribute, the higher your standing.`,
  },
  rewardsReputation: {
    id: 'pages.Contribute.Landing.rewardsReputation',
    defaultMessage: 'Reputation',
  },
  rewardsReputationDescription: {
    id: 'pages.Contribute.Landing.rewardsReputationDescription',
    defaultMessage: `Reputation measures your relative standing and influence in
    the community. It decays over time to keep things fresh.`,
  },
  rewardsToken: {
    id: 'pages.Contribute.Landing.rewardsToken',
    defaultMessage: 'CDEV Token',
  },
  rewardsTokenDescription: {
    id: 'pages.Contribute.Landing.rewardsTokenDescription',
    defaultMessage: `The native token of our developer community, CDEV, is your
    reward for valuable contributions.`,
  },
  rewardsTitle: {
    id: 'pages.Contribute.Landing.rewardsTitle',
    defaultMessage: 'Earn tokens and reputation',
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

  const getIssues = useCallback(() => {
    setError(null);
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
      .catch(fetchError => {
        setError(fetchError.message);
      });
  }, []);

  useEffect(() => {
    if (!loadedLocal) {
      const localContributions = getStore('issues');
      setIssues(localContributions);
      setLoadedLocal(true);
    }
  }, [issues, loadedLocal]);

  useEffect(() => setStore('issues', issues), [issues]);

  useEffect(() => {
    if (!issues && !loading) {
      getIssues();
    }
  }, [getIssues, issues, loading]);

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
            linkTo={PAGE_DEVELOPER_PORTAL_DASHBOARD}
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
      <div className={styles.overview}>
        <div className={styles.overviewItem}>
          <FormattedMessage {...MSG.overviewStep1} />
          <FormattedMessage {...MSG.overviewStep1Description} />
        </div>
        <div className={styles.overviewItem}>
          <FormattedMessage {...MSG.overviewStep2} />
          <FormattedMessage {...MSG.overviewStep2Description} />
        </div>
        <div className={styles.overviewItem}>
          <FormattedMessage {...MSG.overviewStep3} />
          <FormattedMessage {...MSG.overviewStep3Description} />
        </div>
      </div>
      <div className={styles.section}>
        <h1 className={styles.title}>
          <FormattedMessage {...MSG.contributeTitle} />
        </h1>
        <h2 className={styles.subtitle}>
          <FormattedMessage {...MSG.openIssuesTitle} />
        </h2>
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
        {error && <ErrorMessage error={error} />}
        <Button
          appearance={{
            theme: 'reset',
            font: 'small',
            color: 'blue',
            weight: 'medium',
          }}
          linkTo={COLONY_GITHUB_OPEN_ISSUES}
          text={MSG.openIssuesMoreOpenIssues}
          type="submit"
        />
        <h2 className={styles.subtitle}>
          <FormattedMessage {...MSG.moreWaysTitle} />
        </h2>
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
            <tr>
              <td>
                <FormattedMessage {...MSG.moreWaysItemUserStoryTitle} />
              </td>
              <td>
                <FormattedMessage {...MSG.moreWaysItemUserStoryDescription} />
              </td>
            </tr>
            <tr>
              <td>
                <FormattedMessage {...MSG.moreWaysItemOtherTitle} />
              </td>
              <td>
                <FormattedMessage {...MSG.moreWaysItemOtherDescription} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.rewards}>
        <div className={styles.rewardsContent}>
          <h1 className={styles.rewardsTitle}>
            <FormattedMessage {...MSG.rewardsTitle} />
          </h1>
          <p className={styles.rewardsDescription}>
            <FormattedMessage {...MSG.rewardsDescription} />
          </p>
        </div>
        <div className={styles.rewardsItems}>
          <div className={styles.rewardsItem}>
            <Image
              className={styles.rewardsItemImage}
              alt={MSG.heroTitle}
              src="/img/contribute_token.svg"
            />
            <div className={styles.rewardsItemText}>
              <FormattedMessage {...MSG.rewardsToken} />
              <FormattedMessage {...MSG.rewardsTokenDescription} />
            </div>
          </div>
          <div className={styles.rewardsItem}>
            <Image
              className={styles.rewardsItemImage}
              alt={MSG.heroTitle}
              src="/img/contribute_reputation.svg"
            />
            <div className={styles.rewardsItemText}>
              <FormattedMessage {...MSG.rewardsReputation} />
              <FormattedMessage {...MSG.rewardsReputationDescription} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <h1 className={styles.title}>
          <FormattedMessage {...MSG.faqTitle} />
        </h1>
        <div className={styles.sectionContent}>
          <Questions />
          <Image
            className={styles.faqImage}
            alt={MSG.heroTitle}
            src="/img/contribute_faq.svg"
          />
        </div>
      </div>
    </>
  );
};

Landing.displayName = displayName;

export default Landing;
