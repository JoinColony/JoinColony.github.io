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
  issue: Issue,
|};

const displayName = 'pages.Contribute.Issue';

const IssueItem = ({ issue }: Props) => {
  const formatIssueLink = url => {
    const repository = url.split('/')[4];
    const issueNumber = url.split('/')[6];
    return `${repository}#${issueNumber}`;
  };

  // TEMP task assignment for demonstration purposes

  let taskId = 0;

  if (formatIssueLink(issue.node.url) === 'node-metamask#10') {
    taskId = 1;
  }

  // END TEMP

  return (
    <tr>
      <td>{issue.node.createdAt.split('T')[0]}</td>
      <td>{`${issue.node.title.substring(0, 40)}...`}</td>
      <td>
        <Link href={issue.node.url} text={formatIssueLink(issue.node.url)} />
      </td>
      <td>
        {taskId ? (
          <Link
            href={`/contribute/task?id=${taskId}`}
            text={`task#${taskId}`}
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
