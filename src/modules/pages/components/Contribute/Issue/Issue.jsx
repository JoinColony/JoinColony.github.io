/* @flow */

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Issue } from '~types';

import Link from '~core/Link';

const MSG = defineMessages({
  noReward: {
    id: 'pages.Contribute.Issue.noReward',
    defaultMessage: 'none',
  },
});

type Props = {|
  issue: Issue,
|};

const displayName = 'pages.Contribute.Issue';

const server = process.env.SERVER_URL || 'http://localhost:8080';

const IssueItem = ({ issue }: Props) => {
  const [contribution, setContribution] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      // eslint-disable-next-line no-undef
      fetch(`${server}/api/contribution?issue=${issue.node.url}`, options)
        .then(res => res.json())
        .then(data => {
          setContribution(data.contribution);
        })
        .catch(fetchError => {
          setError(fetchError);
        });
    })();
  }, [issue]);

  const formatIssueLink = url => {
    const repository = url.split('/')[4];
    const issueNumber = url.split('/')[6];
    return `${repository}#${issueNumber}`;
  };

  return (
    <tr>
      <td>{issue.node.createdAt.split('T')[0]}</td>
      <td>{`${issue.node.title.substring(0, 40)}...`}</td>
      <td>
        <Link href={issue.node.url} text={formatIssueLink(issue.node.url)} />
      </td>
      <td>
        {contribution && (
          <Link
            href={`/contribute/${contribution.type}?id=${contribution.typeId}`}
            text={`${contribution.type}#${contribution.typeId}`}
          />
        )}
        {!contribution && error && <span>{error}</span>}
        {!contribution && !error && <FormattedMessage {...MSG.noReward} />}
      </td>
    </tr>
  );
};

IssueItem.displayName = displayName;

export default IssueItem;
