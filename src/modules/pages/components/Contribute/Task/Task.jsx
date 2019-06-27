/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl';

import type { Contribution, Network } from '~types';

import ErrorMessage from '~core/ErrorMessage';
import FormattedToken from '~core/FormattedToken';
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
  loadingTask: {
    id: 'pages.Contribute.Task.loadingTask',
    defaultMessage: 'Loading task...',
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
  potId: number,
  potPayout: number,
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
  network: Network,
  path: string,
  wallet: WalletObjectType,
|};

const server = process.env.SERVER_URL || 'https://chora.io';

const TaskPage = ({ colonyClient, network, wallet }: Props) => {
  const [contribution, setContribution] = useState<?Contribution>(null);
  const [error, setError] = useState(null);
  const [loadedContribution, setLoadedContribution] = useState(false);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [loadedTask, setLoadedTask] = useState(false);
  const [task, setTask] = useState<?Task>(null);
  const [taskId, setTaskId] = useState<?number>(null);

  useEffect(() => {
    if (!taskId) {
      if (typeof window !== 'undefined' && window.location.search) {
        const searchId = window.location.search.split('?id=')[1];
        const parsedId = Number(searchId);
        if (parsedId) {
          setTaskId(parsedId);
        } else {
          setError('Nothing to see here...');
        }
      }
    }
  }, [taskId]);

  useEffect(() => {
    if (!loadedLocal && taskId) {
      const localTask = getStore(`task_${taskId}`);
      setTask(localTask);
      setLoadedLocal(true);
    }
  }, [task, loadedLocal, taskId]);

  useEffect(() => {
    if (taskId && task) setStore(`task_${taskId}`, task);
  }, [task, taskId]);

  useEffect(() => {
    if (!loadedContribution && taskId) {
      (async () => {
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        // eslint-disable-next-line no-undef
        fetch(
          `${server}/api/contribution?type=task&typeId=${taskId}&networkId=${
            network ? network.id : 1
          }`,
          options,
        )
          .then(res => res.json())
          .then(data => {
            setContribution(data.contribution);
          })
          .catch(fetchError => {
            setError(fetchError.message);
          });
        setLoadedContribution(true);
      })();
    }
  }, [loadedContribution, network, taskId]);

  useEffect(() => {
    if (!loadedTask && taskId && colonyClient) {
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
          const { payout } = await colonyClient.getFundingPotPayout.call({
            potId: result.potId,
            token: colonyClient.tokenClient.contract.address,
          });
          setTask({
            ...result,
            ratings,
            manager,
            potPayout: payout,
            worker,
          });
        } catch (colonyError) {
          setError(colonyError.message);
        }
        setLoadedTask(true);
      })();
    }
  }, [colonyClient, loadedTask, task, taskId]);

  return (
    <div className={styles.main}>
      {!error && !contribution && !task && (
        <FormattedMessage {...MSG.loadingTask} />
      )}
      {task && contribution && (
        <div>
          {task && (
            <TaskActions
              colonyClient={colonyClient}
              contribution={contribution}
              setContribution={setContribution}
              setError={setError}
              setTask={setTask}
              task={task}
              wallet={wallet}
            />
          )}
          <div className={styles.content}>
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
                <FormattedToken amount={contribution.payout} symbol="CDEV" />
              </div>
            </div>
            {task.worker.address && (
              <div className={styles.field}>
                <div className={styles.label}>
                  <FormattedMessage {...MSG.labelWorker} />
                </div>
                <div className={styles.value}>
                  {`@${contribution.username} (${task.worker.address})`}
                </div>
              </div>
            )}
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelDueDate} />
              </div>
              <div className={styles.value}>
                <FormattedDate
                  day="2-digit"
                  month="2-digit"
                  year="numeric"
                  value={task.dueDate}
                />
              </div>
            </div>
            {contribution.issue && (
              <div className={styles.field}>
                <div className={styles.label}>
                  <FormattedMessage {...MSG.labelIssue} />
                </div>
                <div className={styles.value}>
                  <Link href={contribution.issue} text={contribution.issue} />
                </div>
              </div>
            )}
            {task.completionDate && (
              <div className={styles.field}>
                <div className={styles.label}>
                  <FormattedMessage {...MSG.labelCompletionDate} />
                </div>
                <div className={styles.value}>
                  <FormattedDate
                    day="2-digit"
                    month="2-digit"
                    year="numeric"
                    value={task.completionDate}
                  />
                </div>
              </div>
            )}
            {contribution.pullRequest && (
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
            )}
          </div>
        </div>
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

TaskPage.displayName = displayName;

export default TaskPage;
