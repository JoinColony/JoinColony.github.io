/* @flow */

import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Network, User } from '~types';

import Button from '~core/Button';
import ErrorMessage from '~core/ErrorMessage';
import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';

import IssueTableRow from '~parts/IssueTableRow';

import Questions from './Questions';

import {
  COLONY_DISCOURSE,
  COLONY_DISCOURSE_PROJECTS,
  COLONY_GITHUB,
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
    defaultMessage: "Let's Get Started",
  },
  heroButtonUser: {
    id: 'pages.Contribute.Landing.heroButton',
    defaultMessage: 'Start Contributing',
  },
  heroDescription: {
    id: 'pages.Contribute.Landing.heroDescription',
    defaultMessage: `Get rewarded for contributing to our developer tools. Each
    contribution earns you CDEV tokens, reputation, and a say in future
    decisions.`,
  },
  heroTitle: {
    id: 'pages.Contribute.Landing.heroTitle',
    defaultMessage: 'Contribute and Earn',
  },
  linkDiscourse: {
    id: 'pages.Contribute.Landing.linkDiscourse',
    defaultMessage: 'Discourse',
  },
  linkGitHub: {
    id: 'pages.Contribute.Landing.linkGitHub',
    defaultMessage: 'GitHub',
  },
  issuesDescription: {
    id: 'pages.Contribute.Landing.issuesDescription',
    defaultMessage: `The best way to contribute is to work on one of the issues
    below which are open issues labeled "help wanted" or "good first issue" in
    our open source repositories.`,
  },
  issuesFindMore: {
    id: 'pages.Contribute.Landing.issuesFindMore',
    defaultMessage: 'Find More',
  },
  issuesHeaderDate: {
    id: 'pages.Contribute.Landing.issuesHeaderDate',
    defaultMessage: 'Date',
  },
  issuesHeaderLink: {
    id: 'pages.Contribute.Landing.issuesHeaderLink',
    defaultMessage: 'Link',
  },
  issuesHeaderReward: {
    id: 'pages.Contribute.Landing.issuesHeaderReward',
    defaultMessage: 'Reward',
  },
  issuesHeaderTitle: {
    id: 'pages.Contribute.Landing.issuesHeaderTitle',
    defaultMessage: 'Title',
  },
  issuesTitle: {
    id: 'pages.Contribute.Landing.issuesTitle',
    defaultMessage: 'Open "Help Wanted" Issues',
  },
  ongoingDescription: {
    id: 'pages.Contribute.Landing.ongoingDescription',
    defaultMessage: `Didn’t see any opportunities above? All good, there are
    more ways to contribute.`,
  },
  ongoingItemBugsDescription: {
    id: 'pages.Contribute.Landing.ongoingItemBugsDescription',
    defaultMessage: `Found a bug? Help us squash it. Open an issue and describe
    the problem. The more details, the better.`,
  },
  ongoingItemBugsTitle: {
    id: 'pages.Contribute.Landing.ongoingItemBugsTitle',
    defaultMessage: 'Report Bugs',
  },
  ongoingItemDocsDescription: {
    id: 'pages.Contribute.Landing.ongoingItemDocsDescription',
    defaultMessage: `Look for the "Improve this doc" button at the bottom of
    each page to make an improvement.`,
  },
  ongoingItemDocsTitle: {
    id: 'pages.Contribute.Landing.ongoingItemDocsTitle',
    defaultMessage: 'Documentation',
  },
  ongoingItemFeatureDescription: {
    id: 'pages.Contribute.Landing.ongoingItemFeatureDescription',
    defaultMessage: `Have an idea for a new feature? Open an issue with your
    feature request or a pull request with your feature.`,
  },
  ongoingItemFeatureTitle: {
    id: 'pages.Contribute.Landing.ongoingItemFeatureTitle',
    defaultMessage: 'New Feature',
  },
  ongoingItemOtherDescription: {
    id: 'pages.Contribute.Landing.ongoingItemOtherDescription',
    defaultMessage: `Creative ideas abound. Let us know yours by posting in
    {discourse} or opening an issue in {github}.`,
  },
  ongoingItemOtherTitle: {
    id: 'pages.Contribute.Landing.ongoingItemOtherTitle',
    defaultMessage: 'Something else?',
  },
  ongoingItemUserStoryDescription: {
    id: 'pages.Contribute.Landing.ongoingItemUserStoryDescription',
    defaultMessage: `Use-case examples, tutorials, lessons learned — whatever it
    is, we like user stories. Write it up and post it in {discourse}.`,
  },
  ongoingItemUserStoryTitle: {
    id: 'pages.Contribute.Landing.ongoingItemUserStoryTitle',
    defaultMessage: 'User Stories',
  },
  ongoingTitle: {
    id: 'pages.Contribute.Landing.ongoingTitle',
    defaultMessage: 'Ongoing Ways to Contribute',
  },
  overviewStep1: {
    id: 'pages.Contribute.Landing.overviewStep1',
    defaultMessage: '1. Create an account',
  },
  overviewStep1Description: {
    id: 'pages.Contribute.Landing.overviewStep1Description',
    defaultMessage: `Connect MetaMask, link GitHub, and you’re all set. We need
    this so we can send your sweet, sweet rewards.`,
  },
  overviewStep2: {
    id: 'pages.Contribute.Landing.overviewStep2',
    defaultMessage: '2. Make a contribution',
  },
  overviewStep2Description: {
    id: 'pages.Contribute.Landing.overviewStep2Description',
    defaultMessage: `Work on a "Help Wanted" issue, report a bug, write a
    tutorial, or more. There are plenty of ways to get involved.`,
  },
  overviewStep3: {
    id: 'pages.Contribute.Landing.overviewStep3',
    defaultMessage: '3. Get rewarded',
  },
  overviewStep3Description: {
    id: 'pages.Contribute.Landing.overviewStep3Description',
    defaultMessage: `Contributions are rewarded with tokens and
    reputation. Check your account page to see your current score!`,
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
  user: User,
|};

const displayName = 'pages.Contribute.Landing';

const Landing = ({ network, user }: Props) => {
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
          <Heading
            appearance={{ size: 'huge', theme: 'invert', weight: 'medium' }}
            style={{ fontSize: '40px' }}
            text={MSG.heroTitle}
          />
          <p className={styles.heroDescription}>
            <FormattedMessage {...MSG.heroDescription} />
          </p>
          <Button
            appearance={{
              theme: 'callToAction',
              padding: 'huge',
              weight: 'medium',
            }}
            linkTo={user ? '#contribute' : PAGE_DEVELOPER_PORTAL_DASHBOARD}
            text={user ? MSG.heroButtonUser : MSG.heroButton}
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
      <div id="contribute" className={styles.section}>
        <Heading
          appearance={{ size: 'huge', theme: 'dark', weight: 'medium' }}
          style={{ fontSize: '40px' }}
          text={MSG.contributeTitle}
        />
        <h2 className={styles.subtitle}>
          <FormattedMessage {...MSG.issuesTitle} />
        </h2>
        <p className={styles.description}>
          <FormattedMessage {...MSG.issuesDescription} />
        </p>
        <table className={styles.issues}>
          <thead>
            <tr>
              <td>
                <FormattedMessage {...MSG.issuesHeaderDate} />
              </td>
              <td>
                <FormattedMessage {...MSG.issuesHeaderTitle} />
              </td>
              <td>
                <FormattedMessage {...MSG.issuesHeaderLink} />
              </td>
              <td>
                <FormattedMessage {...MSG.issuesHeaderReward} />
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
          arrow="right"
          linkTo={COLONY_GITHUB_OPEN_ISSUES}
          text={MSG.issuesFindMore}
          type="submit"
        />
        <h2 className={styles.subtitle}>
          <FormattedMessage {...MSG.ongoingTitle} />
        </h2>
        <p className={styles.description}>
          <FormattedMessage {...MSG.ongoingDescription} />
        </p>
        <table className={styles.ongoing}>
          <tbody>
            <tr>
              <td>
                <FormattedMessage {...MSG.ongoingItemBugsTitle} />
              </td>
              <td>
                <FormattedMessage {...MSG.ongoingItemBugsDescription} />
              </td>
            </tr>
            <tr>
              <td>
                <FormattedMessage {...MSG.ongoingItemDocsTitle} />
              </td>
              <td>
                <FormattedMessage {...MSG.ongoingItemDocsDescription} />
              </td>
            </tr>
            <tr>
              <td>
                <FormattedMessage {...MSG.ongoingItemFeatureTitle} />
              </td>
              <td>
                <FormattedMessage {...MSG.ongoingItemFeatureDescription} />
              </td>
            </tr>
            <tr>
              <td>
                <FormattedMessage {...MSG.ongoingItemUserStoryTitle} />
              </td>
              <td>
                <FormattedMessage
                  {...MSG.ongoingItemUserStoryDescription}
                  values={{
                    discourse: (
                      <Link
                        href={COLONY_DISCOURSE_PROJECTS}
                        text={MSG.linkDiscourse}
                      />
                    ),
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <FormattedMessage {...MSG.ongoingItemOtherTitle} />
              </td>
              <td>
                <FormattedMessage
                  {...MSG.ongoingItemOtherDescription}
                  values={{
                    discourse: (
                      <Link href={COLONY_DISCOURSE} text={MSG.linkDiscourse} />
                    ),
                    github: <Link href={COLONY_GITHUB} text={MSG.linkGitHub} />,
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.rewards}>
        <div className={styles.rewardsContent}>
          <Heading
            appearance={{ size: 'huge', theme: 'gold', weight: 'medium' }}
            style={{ fontSize: '40px' }}
            text={MSG.rewardsTitle}
          />
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
      <div className={styles.faq}>
        <Heading
          appearance={{ size: 'large', theme: 'dark', weight: 'medium' }}
          style={{ fontSize: '40px' }}
          text={MSG.faqTitle}
        />
        <div className={styles.faqContent}>
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
