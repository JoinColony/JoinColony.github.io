/* @flow */

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl';

import type { Issue } from '~types';

import FormattedToken from '~core/FormattedToken';
import Link from '~core/Link';
import SpinnerLoader from '~core/SpinnerLoader';

import styles from './IssueTableRow.module.css';

const MSG = defineMessages({
  error: {
    id: 'pages.Contribute.Issue.error',
    defaultMessage: 'error',
  },
  notSet: {
    id: 'pages.Contribute.Issue.notSet',
    defaultMessage: 'not set',
  },
});

type Props = {|
  issue: Issue,
  loadedRemote?: boolean,
|};

const displayName = 'pages.Contribute.Issue';

const server = process.env.SERVER_URL || 'http://localhost:8080';

const IssueTableRow = ({ issue, loadedRemote }: Props) => {
  const [contribution, setContribution] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (loadedRemote) {
        setLoading(true);
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        // eslint-disable-next-line no-undef
        fetch(`${server}/api/contribution?issue=${issue.node.url}`, options)
          .then(res => res.json())
          .then(data => {
            setContribution(data.contribution);
            setLoading(false);
          })
          .catch(fetchError => {
            setError(fetchError);
            setLoading(false);
          });
      }
    })();
  }, [issue, loadedRemote]);

  const formatIssueLink = url => {
    const repository = url.split('/')[4];
    const issueNumber = url.split('/')[6];
    return `${repository}#${issueNumber}`;
  };

  return (
    <tr>
      <td>
        <FormattedDate value={issue.node.createdAt} />
      </td>
      <td>
        {issue.node.title.length > 50
          ? issue.node.title.substring(0, 50).concat('...')
          : issue.node.title}
      </td>
      <td>
        <Link href={issue.node.url} text={formatIssueLink(issue.node.url)} />
      </td>
      <td>
        {contribution && (
          <Link
            href={`/contribute/${contribution.type}?id=${contribution.typeId}`}
          >
            <FormattedToken amount={contribution.payout} symbol="CDEV" />
          </Link>
        )}
        {!contribution && loading && (
          <SpinnerLoader appearance={{ theme: 'primary' }} />
        )}
        {!contribution && !loading && !error && (
          <FormattedMessage {...MSG.notSet} />
        )}
        {!contribution && error && (
          <span className={styles.error}>
            <FormattedMessage {...MSG.error} />
          </span>
        )}
      </td>
    </tr>
  );
};

IssueTableRow.displayName = displayName;

export default IssueTableRow;