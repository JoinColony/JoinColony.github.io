/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { sha3 } from 'web3-utils';

import Button from '~core/Button';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './TaskActions.module.css';

const MSG = defineMessages({
  buttonApproveWorker: {
    id: 'pages.Contribute.Task.buttonApproveWorker',
    defaultMessage: 'Approve Worker',
  },
  buttonStartWork: {
    id: 'pages.Contribute.Task.buttonStartWork',
    defaultMessage: 'Start Work',
  },
  buttonSubmitWork: {
    id: 'pages.Contribute.Task.buttonSubmitWork',
    defaultMessage: 'Submit Work',
  },
  buttonSubmitRating: {
    id: 'pages.Contribute.Task.buttonSubmitRating',
    defaultMessage: 'Submit Rating',
  },
  buttonRevealRating: {
    id: 'pages.Contribute.Task.buttonRevealRating',
    defaultMessage: 'Reveal Rating',
  },
  buttonFinalizeTask: {
    id: 'pages.Contribute.Task.buttonFinalizeTask',
    defaultMessage: 'Finalize Task',
  },
  buttonClaimPayout: {
    id: 'pages.Contribute.Task.buttonClaimPayout',
    defaultMessage: 'Claim Payout',
  },
});

const displayName = 'pages.Contribute.Task.TaskActions';

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
  task: Task,
  setTask: (task: Task) => void,
  wallet: WalletObjectType,
|};

const TaskActions = ({ colonyClient, task, setTask, wallet }: Props) => {
  const [pendingOperation, setPendingOperation] = useState(null);

  const handleApproveWorker = async () => {
    // TODO Get the operation from the database
    const operationJSON = getStore(`task_${task.id}_operation`);
    if (operationJSON) {
      const operation = await colonyClient.setTaskWorkerRole.restoreOperation(
        operationJSON,
      );
      setPendingOperation(operation);
      await operation.sign();
      // TODO The gas limit needs to be fixed in colonyJS
      await operation.send({ gasLimit: 1000000 });
      const worker = await colonyClient.getTaskRole.call({
        taskId: task.id,
        role: 'WORKER',
      });
      setTask({ ...task, worker });
      setPendingOperation(null);
      // TODO Remove the opetation from the database
      setStore(`task_${task.id}_operation`, null);
    }
  };

  const handleStartWork = async () => {
    if (wallet.address) {
      const operation = await colonyClient.setTaskWorkerRole.startOperation({
        taskId: task.id,
        // $FlowFixMe See https://github.com/JoinColony/colonyJS/pull/416
        address: wallet.address,
      });
      await operation.sign();
      setPendingOperation(operation);

      // TODO Save the operation to the database
      setStore(`task_${task.id}_operation`, operation.toJSON());
    }
  };

  const handleSubmitWork = async () => {
    await colonyClient.submitTaskDeliverable.send(
      {
        taskId: task.id,
        deliverableHash: task.specificationHash,
      },
      {},
    );
    const result = await colonyClient.getTask.call({
      taskId: task.id,
    });
    setTask({ ...task, ...result });
  };

  const handleSubmitRating = async worker => {
    const { secret } = await colonyClient.generateSecret.call({
      salt: sha3('secret'),
      value: 2,
    });
    await colonyClient.submitTaskWorkRating.send(
      {
        taskId: task.id,
        role: worker ? 'MANAGER' : 'WORKER',
        secret,
      },
      {},
    );
    const ratings = await colonyClient.getTaskWorkRatingSecretsInfo.call({
      taskId: task.id,
    });
    setTask({ ...task, ratings });
  };

  const handleRevealRating = async worker => {
    const salt = sha3('secret');
    await colonyClient.revealTaskWorkRating.send(
      {
        taskId: task.id,
        role: worker ? 'MANAGER' : 'WORKER',
        rating: 2,
        salt,
      },
      {},
    );
    const result = await colonyClient.getTaskRole.call({
      taskId: task.id,
      role: worker ? 'MANAGER' : 'WORKER',
    });
    if (worker) setTask({ ...task, manager: result });
    else setTask({ ...task, worker: result });
  };

  const handleFinalizeTask = async () => {
    await colonyClient.finalizeTask.send({ taskId: task.id }, {});
    const result = await colonyClient.getTask.call({
      taskId: task.id,
    });
    setTask({ ...task, ...result });
  };

  const handleClaimPayout = async () => {
    await colonyClient.claimTaskPayout.send(
      {
        taskId: task.id,
        role: 'WORKER',
        token: colonyClient.tokenClient.contract.address,
      },
      {},
    );
    const { payout } = await colonyClient.getFundingPotPayout.call({
      potId: task.potId,
      token: colonyClient.tokenClient.contract.address,
    });
    setTask({
      ...task,
      payout: payout.toString(),
    });
  };

  return (
    <div className={styles.main}>
      {!task.worker.address && (
        <div className={styles.buttons}>
          <Button
            appearance={{ theme: 'primary' }}
            disabled={pendingOperation}
            onClick={handleStartWork}
            text={MSG.buttonStartWork}
            type="submit"
          />
          {pendingOperation && <i>A request has been received</i>}
        </div>
      )}
      {task.worker &&
        task.worker.address &&
        task.worker.address.toLowerCase() === wallet.address && (
          <div className={styles.buttons}>
            <Button
              appearance={{ theme: 'primary' }}
              disabled={task.completionDate}
              onClick={handleSubmitWork}
              text={MSG.buttonSubmitWork}
              type="submit"
            />
            <Button
              appearance={{ theme: 'primary' }}
              disabled={!task.completionDate || task.ratings.count !== 0}
              onClick={() => handleSubmitRating(true)}
              text={MSG.buttonSubmitRating}
              type="submit"
            />
            <Button
              appearance={{ theme: 'primary' }}
              disabled={!task.completionDate || task.manager.rating !== 0}
              onClick={() => handleRevealRating(true)}
              text={MSG.buttonRevealRating}
              type="submit"
            />
            <Button
              appearance={{ theme: 'primary' }}
              disabled={task.status !== 'FINALIZED' || task.payout === '0'}
              onClick={handleClaimPayout}
              text={MSG.buttonClaimPayout}
              type="submit"
            />
          </div>
        )}
      {task.manager &&
        task.manager.address &&
        task.manager.address.toLowerCase() === wallet.address && (
          <div className={styles.buttons}>
            <Button
              appearance={{ theme: 'primary' }}
              disabled={!pendingOperation}
              onClick={handleApproveWorker}
              text={MSG.buttonApproveWorker}
              type="submit"
            />
            <Button
              appearance={{ theme: 'primary' }}
              disabled={!task.completionDate || task.ratings.count !== 1}
              onClick={() => handleSubmitRating(false)}
              text={MSG.buttonSubmitRating}
              type="submit"
            />
            <Button
              appearance={{ theme: 'primary' }}
              disabled={!task.completionDate || task.worker.rating !== 0}
              onClick={() => handleRevealRating(false)}
              text={MSG.buttonRevealRating}
              type="submit"
            />
            <Button
              appearance={{ theme: 'primary' }}
              disabled={
                !task.completionDate ||
                (task.manager.rating === 0 && task.worker.rating === 0) ||
                task.status === 'FINALIZED'
              }
              onClick={handleFinalizeTask}
              text={MSG.buttonFinalizeTask}
              type="submit"
            />
          </div>
        )}
    </div>
  );
};

TaskActions.displayName = displayName;

export default TaskActions;
