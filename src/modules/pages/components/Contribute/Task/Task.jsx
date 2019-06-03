/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';
import type { Socket } from 'socket.io-client';

import React, { useEffect, useMemo, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Provider, User } from '~types';

import Link from '~core/Link';

import Login from '../../Dashboard/Login';
import MetaMask from '../../Dashboard/MetaMask';
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
  labelDeliverable: {
    id: 'pages.Contribute.Task.labelDeliverable',
    defaultMessage: 'Deliverable',
  },
  labelDueDate: {
    id: 'pages.Contribute.Task.labelDueDate',
    defaultMessage: 'Due Date',
  },
  labelPayout: {
    id: 'pages.Contribute.Task.labelPayout',
    defaultMessage: 'Payout',
  },
  labelSpecification: {
    id: 'pages.Contribute.Task.labelSpecification',
    defaultMessage: 'Specification',
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

const displayName = 'pages.Contribute.Task';

type TaskType = {|
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
  authenticate: (provider: Provider) => void,
  colonyClient: ColonyClient,
  socket: ?Socket,
  user: User,
  wallet: WalletObjectType,
|};

const Task = ({ authenticate, colonyClient, user, wallet }: Props) => {
  const [contribution, setContribution] = useState(null);
  const [error, setError] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [pendingOperation, setPendingOperation] = useState(null);
  const [task, setTask] = useState<?TaskType>(null);

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

  const server = process.env.SERVER_URL || 'http://localhost:8080';

  useEffect(() => {
    if (taskId) {
      (async () => {
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        // eslint-disable-next-line no-undef
        fetch(
          `${server}/api/contribution/type?type=task&typeId=${taskId}`,
          options,
        )
          .then(res => res.json())
          .then(data => {
            setContribution(data.contribution);
          })
          .catch(fetchError => {
            setError(fetchError);
          });
      })();
    }
  }, [server, taskId]);

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
          const { amount: payout } = await colonyClient.getTaskPayout.call({
            taskId,
            role: 'WORKER',
            token: colonyClient.tokenClient.contract.address,
          });
          const ratings = await colonyClient.getTaskWorkRatingSecretsInfo.call({
            taskId,
          });
          setTask({
            ...result,
            ratings,
            manager,
            worker,
            payout: payout.toString(),
          });
        } catch (err) {
          setError(err);
        }
      })();
    }
  }, [colonyClient, taskId]);

  if (!wallet) {
    return <MetaMask />;
  }

  if (wallet && !user) {
    return <Login authenticate={authenticate} error={error} wallet={wallet} />;
  }

  return (
    <div className={styles.main}>
      {error && <p>{error.message}</p>}
      {!error && !task && !contribution && <p>loading...</p>}
      {task && contribution && (
        <div>
          <TaskActions
            colonyClient={colonyClient}
            setTask={setTask}
            task={task}
            wallet={wallet}
          />
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
              <div className={styles.value}>{`${task.payout} CDEV`}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelWorker} />
              </div>
              <div className={styles.value}>
                {`@${contribution.worker} (${task.worker.address})`}
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
                <FormattedMessage {...MSG.labelSpecification} />
              </div>
              <div className={styles.value}>
                <Link
                  href={contribution.link}
                  text={contribution.specification}
                />
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
                <FormattedMessage {...MSG.labelDeliverable} />
              </div>
              <div className={styles.value}>
                <Link
                  href={contribution.link}
                  text={contribution.deliverable}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Task.displayName = displayName;

export default Task;
