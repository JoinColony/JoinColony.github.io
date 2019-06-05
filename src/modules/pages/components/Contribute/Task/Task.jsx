/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useEffect, useMemo, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Link from '~core/Link';

import TaskActions from './TaskActions';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './Task.module.css';

const MSG = defineMessages({
  labelCompletionDate: {
    id: 'pages.Contribute.Task.labelCompletionDate',
    defaultMessage: 'Completion Date',
  },
  labelPullRequest: {
    id: 'pages.Contribute.Task.labelPullRequest',
    defaultMessage: 'Pull Request',
  },
  labelDueDate: {
    id: 'pages.Contribute.Task.labelDueDate',
    defaultMessage: 'Due Date',
  },
  labelPayout: {
    id: 'pages.Contribute.Task.labelPayout',
    defaultMessage: 'Payout',
  },
  labelIssue: {
    id: 'pages.Contribute.Task.labelIssue',
    defaultMessage: 'Issue',
  },
  labelStatus: {
    id: 'pages.Contribute.Task.labelStatus',
    defaultMessage: 'Status',
  },
  labelTask: {
    id: 'pages.Contribute.Task.labelTask',
    defaultMessage: 'Task',
  },
  labelWorker: {
    id: 'pages.Contribute.Task.labelWorker',
    defaultMessage: 'Worker',
  },
});

const displayName = 'pages.Contribute.TaskPage';

type Task = {|
  id: number,
  completionDate: string,
  dueDate: string,
  manager: {
    address: string,
    rating: number,
  },
  payout: number,
  potId: number,
  ratings: {
    count: number,
  },
  specificationHash: string,
  status: string,
  worker: {
    address: string,
    rating: number,
  },
|};

type Props = {|
  colonyClient: ColonyClient,
  path: string,
  wallet: WalletObjectType,
|};

const server = process.env.SERVER_URL || 'http://localhost:8080';

const TaskPage = ({ colonyClient, wallet }: Props) => {
  const [contribution, setContribution] = useState(null);
  const [error, setError] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [pendingOperation, setPendingOperation] = useState(null);
  const [task, setTask] = useState<?Task>(null);

  const taskId: ?number = useMemo(() => {
    if (typeof window !== 'undefined') {
      const taskIdString = window.location.search.split('id=')[1];
      if (taskIdString) return Number(taskIdString);
      return null;
    }
    return null;
  }, []);

  useEffect(() => {
    if (!loadedLocal && taskId) {
      const localTask = getStore(`task_${taskId}`);
      const localOperation = getStore(`task_${taskId}_operation`);
      setTask(localTask);
      setPendingOperation(localOperation);
      setLoadedLocal(true);
    }
  }, [task, loadedLocal, taskId]);

  useEffect(() => {
    if (taskId) setStore(`task_${taskId}`, task);
  }, [task, taskId]);

  useEffect(() => {
    if (taskId) setStore(`task_${taskId}_operation`, pendingOperation);
  }, [pendingOperation, taskId]);

  useEffect(() => {
    if (taskId) {
      (async () => {
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        // eslint-disable-next-line no-undef
        fetch(`${server}/api/contribution?type=task&typeId=${taskId}`, options)
          .then(res => res.json())
          .then(data => {
            setContribution(data.contribution);
          })
          .catch(fetchError => {
            setError(fetchError);
          });
      })();
    }
  }, [taskId]);

  useEffect(() => {
    if (colonyClient && taskId) {
      (async () => {
        try {
          const result = await colonyClient.getTask.call({
            taskId,
          });
          const manager = await colonyClient.getTaskRole.call({
            taskId,
            role: 'MANAGER',
          });
          const worker = await colonyClient.getTaskRole.call({
            taskId,
            role: 'WORKER',
          });
          const ratings = await colonyClient.getTaskWorkRatingSecretsInfo.call({
            taskId,
          });
          setTask({
            ...result,
            ratings,
            manager,
            worker,
          });
        } catch (err) {
          setError(err);
        }
      })();
    }
  }, [colonyClient, taskId]);

  return (
    <div className={styles.main}>
      {error && <p>{error.message}</p>}
      {!error && !task && !contribution && <p>loading...</p>}
      {task && contribution && (
        <div>
          {task && (
            <TaskActions
              colonyClient={colonyClient}
              setTask={setTask}
              task={task}
              wallet={wallet}
            />
          )}
          <div className={styles.task}>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelTask} />
              </div>
              <div className={styles.value}>{task.id}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelStatus} />
              </div>
              <div className={styles.value}>{task.status}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelPayout} />
              </div>
              <div className={styles.value}>
                {`${contribution.payout} CDEV`}
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelWorker} />
              </div>
              <div className={styles.value}>
                {`@${contribution.username} (${task.worker.address})`}
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelDueDate} />
              </div>
              <div className={styles.value}>{`${task.dueDate}`}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelIssue} />
              </div>
              <div className={styles.value}>
                <Link href={contribution.issue} text={contribution.issue} />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelCompletionDate} />
              </div>
              <div className={styles.value}>{`${task.completionDate}`}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelPullRequest} />
              </div>
              <div className={styles.value}>
                <Link
                  href={contribution.pullRequest}
                  text={contribution.pullRequest}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TaskPage.displayName = displayName;

export default TaskPage;
