/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';

import React, { useCallback, useState } from 'react';
import { defineMessages } from 'react-intl';
import { BN } from 'web3-utils';

import type { Network } from '~types';

import ipfs from '~utils/ipfs';

import Button from '~core/Button';
import ErrorMessage from '~core/ErrorMessage';
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
    defaultMessage: 'Success! Click here to view the task.',
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
    defaultMessage: 'GitHub Issue URL',
  },
  labelSkillId: {
    id: 'pages.Dashboard.Admin.AddTask.labelSkillId',
    defaultMessage: 'Skill ID',
  },
});

const displayName = 'pages.Contribute.AddTask';

type Props = {|
  colonyClient: ?ColonyClient,
  network: Network,
|};

const server = process.env.SERVER_URL || 'http://178.128.59.237:8000';

const AddTask = ({ colonyClient, network }: Props) => {
  const [amount, setAmount] = useState(0);
  const [contribution, setContribution] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const [issue, setIssue] = useState('');
  const [skillId, setSkillId] = useState(0);

  const handleAddTask = async () => {
    if (colonyClient && amount && dueDate && issue && skillId) {
      await ipfs.init();
      const specificationHash = await ipfs.saveHash(issue);
      await ipfs.stop();
      const addTaskResponse = await colonyClient.addTask.send(
        {
          specificationHash,
          domainId: 1,
          skillId: Number(skillId),
          dueDate: new Date(dueDate),
        },
        {},
      );
      // $FlowFixMe
      const { taskId } = addTaskResponse.eventData;
      await colonyClient.setAllTaskPayouts.send(
        {
          taskId,
          token: colonyClient.tokenClient.contract.address,
          managerAmount: new BN(0),
          evaluatorAmount: new BN(0),
          workerAmount: new BN(amount),
        },
        {},
      );
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issue,
          networkId: network.id,
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

  const handleChangeAmount = useCallback(
    event => {
      if (contribution) setContribution(null);
      if (error) setError(null);
      setAmount(event.currentTarget.value);
    },
    [contribution, error],
  );

  const handleChangeDueDate = useCallback(
    event => {
      if (contribution) setContribution(null);
      if (error) setError(null);
      setDueDate(event.currentTarget.value);
    },
    [contribution, error],
  );

  const handleChangeIssue = useCallback(
    event => {
      if (contribution) setContribution(null);
      if (error) setError(null);
      setIssue(event.currentTarget.value);
    },
    [contribution, error],
  );

  const handleChangeSkillId = useCallback(
    event => {
      if (contribution) setContribution(null);
      if (error) setError(null);
      setSkillId(event.currentTarget.value);
    },
    [contribution, error],
  );

  return (
    <div className={styles.main}>
      <div className={styles.field}>
        <Input
          appearance={{
            padding: 'huge',
            size: 'stretch',
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
            size: 'stretch',
          }}
          id="amount"
          label={MSG.labelAmount}
          onChange={handleChangeAmount}
          type="number"
          value={amount}
        />
      </div>
      <div className={styles.field}>
        <Input
          appearance={{
            padding: 'huge',
            size: 'stretch',
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
            size: 'stretch',
          }}
          id="issue"
          label={MSG.labelIssue}
          onChange={handleChangeIssue}
          type="text"
          value={issue}
        />
      </div>
      <div className={styles.field}>
        <Button
          appearance={{
            theme: 'primary',
            padding: 'huge',
            size: 'stretch',
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
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

AddTask.displayName = displayName;

export default AddTask;
