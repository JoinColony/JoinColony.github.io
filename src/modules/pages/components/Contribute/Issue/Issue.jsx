/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Issue } from '~types';

import Link from '~core/Link';

const MSG = defineMessages({
  noTask: {
    id: 'pages.Contribute.Issue.noTask',
    defaultMessage: 'none',
  },
});

type Props = {|
  contributions: Array<{
    deliverable: string,
    operations: Array<string>,
    specification: string,
    type: string,
    typeId: number,
    worker: string,
  }>,
  issue: Issue,
|};

const displayName = 'pages.Contribute.Issue';

const IssueItem = ({ contributions, issue }: Props) => {
  const formatIssueLink = url => {
    const repository = url.split('/')[4];
    const issueNumber = url.split('/')[6];
    return `${repository}#${issueNumber}`;
  };
  let contribution;
  if (contributions && contributions.length) {
    const contributionIndex = contributions.findIndex(
      c => c.specification === issue.node.url,
    );
    if (contributionIndex) {
      contribution = contributions[contributionIndex];
    }
  }
  return (
    <tr>
      <td>{issue.node.createdAt.split('T')[0]}</td>
      <td>{`${issue.node.title.substring(0, 40)}...`}</td>
      <td>
        <Link href={issue.node.url} text={formatIssueLink(issue.node.url)} />
      </td>
      <td>
        {contribution ? (
          <Link
            href={`/contribute/${contribution.type}?id=${contribution.typeId}`}
            text={`${contribution.type}#${contribution.typeId}`}
          />
        ) : (
          <FormattedMessage {...MSG.noTask} />
        )}
      </td>
    </tr>
  );
};

IssueItem.displayName = displayName;

export default IssueItem;
