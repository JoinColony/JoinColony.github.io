/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { BN } from 'web3-utils';

import Button from '~core/Button';
import Input from '~core/Input';
import Link from '~core/Link';

import styles from './AddTask.module.css';

const MSG = defineMessages({
  buttonAddTask: {
    id: 'pages.Dashboard.Admin.AddTask.buttonAddTask',
    defaultMessage: 'Add Task',
  },
  contributionLink: {
    id: 'pages.Dashboard.Admin.AddTask.contributionLink',
    defaultMessage: 'Sucess! Click here to view the task.',
  },
  labelAmount: {
    id: 'pages.Dashboard.Admin.AddTask.labelAmount',
    defaultMessage: 'Payout Amount',
  },
  labelDueDate: {
    id: 'pages.Dashboard.Admin.AddTask.labelDueDate',
    defaultMessage: 'Due Date',
  },
  labelIssue: {
    id: 'pages.Dashboard.Admin.AddTask.labelIssue',
    defaultMessage: 'Issue URL',
  },
  labelSkillId: {
    id: 'pages.Dashboard.Admin.AddTask.labelSkillId',
    defaultMessage: 'Skill ID',
  },
});

const displayName = 'pages.Contribute.AddTask';

type Props = {|
  colonyClient: ?ColonyClient,
|};

const server = process.env.SERVER_URL || 'http://localhost:8080';

const AddTask = ({ colonyClient }: Props) => {
  const [amount, setAmount] = useState(0);
  const [contribution, setContribution] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const [issue, setIssue] = useState('');
  const [skillId, setSkillId] = useState(0);

  const handleAddTask = async () => {
    if (colonyClient && amount && dueDate && issue && skillId) {
      const addTaskResponse = await colonyClient.addTask.send(
        {
          specificationHash: issue,
          domainId: 1,
          skillId,
          dueDate,
        },
        {},
      );
      // $FlowFixMe
      const { taskId } = addTaskResponse.eventData;
      await colonyClient.setTaskWorkerPayout.send(
        {
          taskId,
          token: colonyClient.tokenClient.contract.address,
          amount: new BN(amount),
        },
        {},
      );
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issue,
          payout: amount,
          type: 'task',
          typeId: taskId,
        }),
      };
      // eslint-disable-next-line no-undef
      fetch(`${server}/api/contribution`, options)
        .then(res => res.json())
        .then(data => {
          setContribution(data.contribution);
        })
        .catch(fetchError => {
          setError(fetchError.message);
        });
    } else {
      setError('All fields required');
    }
  };

  const handleChangeAmount = event => {
    if (contribution) setContribution(null);
    if (error) setError(null);
    setAmount(event.currentTarget.value);
  };

  const handleChangeDueDate = event => {
    if (contribution) setContribution(null);
    if (error) setError(null);
    setDueDate(event.currentTarget.value);
  };

  const handleChangeIssue = event => {
    if (contribution) setContribution(null);
    if (error) setError(null);
    setIssue(event.currentTarget.value);
  };

  const handleChangeSkillId = event => {
    if (contribution) setContribution(null);
    if (error) setError(null);
    setSkillId(event.currentTarget.value);
  };

  return (
    <div className={styles.main}>
      <div className={styles.field}>
        <Input
          appearance={{
            padding: 'huge',
            width: 'stretch',
          }}
          id="issue"
          label={MSG.labelIssue}
          onChange={handleChangeIssue}
          type="text"
          value={issue}
        />
      </div>
      <div className={styles.field}>
        <Input
          appearance={{
            padding: 'huge',
            width: 'stretch',
          }}
          id="dueDate"
          label={MSG.labelDueDate}
          onChange={handleChangeDueDate}
          type="date"
          value={dueDate}
        />
      </div>
      <div className={styles.field}>
        <Input
          appearance={{
            padding: 'huge',
            width: 'stretch',
          }}
          id="skillId"
          label={MSG.labelSkillId}
          onChange={handleChangeSkillId}
          type="number"
          value={skillId}
        />
      </div>
      <div className={styles.field}>
        <Input
          appearance={{
            padding: 'huge',
            width: 'stretch',
          }}
          id="amount"
          label={MSG.labelAmount}
          onChange={handleChangeAmount}
          type="number"
          value={amount}
        />
      </div>
      <div className={styles.field}>
        <Button
          appearance={{
            theme: 'primary',
            padding: 'huge',
            width: 'stretch',
          }}
          disabled={!amount || !dueDate || !issue || !skillId}
          onClick={handleAddTask}
          text={MSG.buttonAddTask}
          type="submit"
        />
      </div>
      {contribution && (
        <div className={styles.success}>
          <Link
            href={`/contribute/${contribution.type}?id=${contribution.typeId}`}
            text={MSG.contributionLink}
          />
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

AddTask.displayName = displayName;

export default AddTask;
