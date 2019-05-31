/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useEffect, useMemo, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { sha3 } from 'web3-utils';

import Button from '~core/Button';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './Task.module.css';

const MSG = defineMessages({
  task: {
    id: 'pages.Contribute.Task.task',
    defaultMessage: 'Task',
  },
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

const displayName = 'pages.Contribute.Task';

type Props = {|
  networkClient: ColonyNetworkClient,
  wallet: WalletObjectType,
|};

const Task = ({ networkClient, wallet }: Props) => {
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [loadedTask, setLoadedTask] = useState(false);
  const [task, setTask] = useState(null);
  const [pendingOperation, setPendingOperation] = useState(null);

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
    if (!loadedTask && networkClient && taskId) {
      (async () => {
        setLoadedTask(true);
        const colonyClient = await networkClient.getColonyClientByAddress(
          '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
        );
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
        const pot = await colonyClient.getFundingPot.call({
          potId: result.potId,
        });
        const { payout } = await colonyClient.getFundingPotPayout.call({
          potId: result.potId,
          token: colonyClient.tokenClient.contract.address,
        });
        setTask({
          ...result,
          manager,
          worker,
          pot: { payout: payout.toString(), ...pot },
        });
      })();
    }
  });

  const handleApproveWorker = async () => {
    if (taskId) {
      // TODO Get the operation from the database
      const operationJSON = getStore(`task_${taskId}_operation`);

      const colonyClient = await networkClient.getColonyClientByAddress(
        '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
      );
      const operation = await colonyClient.setTaskWorkerRole.restoreOperation(
        operationJSON,
      );
      setPendingOperation(operation);
      await operation.sign();
      // TODO The gas limit needs to be fixed in colonyJS
      await operation.send({ gasLimit: 1000000 });
      setPendingOperation(null);

      // TODO Remove the opetation from the database
      setStore(`task_${taskId}_operation`, null);
    }
  };

  const handleStartWork = async () => {
    if (taskId) {
      const colonyClient = await networkClient.getColonyClientByAddress(
        '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
      );
      const operation = await colonyClient.setTaskWorkerRole.startOperation({
        taskId,
        user: wallet.address,
      });
      await operation.sign();

      // TODO Save the operation to the database
      setStore(`task_${taskId}_operation`, operation.toJSON());
    }
  };

  const handleSubmitWork = async () => {
    if (task) {
      const colonyClient = await networkClient.getColonyClientByAddress(
        '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
      );
      await colonyClient.submitTaskDeliverable.send({
        taskId,
        deliverableHash: task.specificationHash,
      });
    }
  };

  const handleSubmitRating = async () => {
    const colonyClient = await networkClient.getColonyClientByAddress(
      '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
    );
    const { secret } = await colonyClient.generateSecret.call({
      salt: sha3('secret'),
      value: 2,
    });
    await colonyClient.submitTaskWorkRating.send({
      taskId,
      role: 'MANAGER',
      secret,
    });
  };

  const handleRevealRating = async () => {
    const colonyClient = await networkClient.getColonyClientByAddress(
      '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
    );
    const salt = sha3('secret');
    await colonyClient.revealTaskWorkRating.send({
      taskId,
      role: 'MANAGER',
      rating: 2,
      salt,
    });
  };

  const handleFinalizeTask = async () => {
    const colonyClient = await networkClient.getColonyClientByAddress(
      '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
    );
    await colonyClient.finalizeTask.send({ taskId });
  };

  const handleClaimPayout = async () => {
    const colonyClient = await networkClient.getColonyClientByAddress(
      '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
    );
    await colonyClient.claimTaskPayout.send({
      taskId,
      role: 'WORKER',
      token: colonyClient.tokenClient.contract.address,
    });
  };

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>
          <FormattedMessage {...MSG.task} />
        </h1>
        {task ? (
          <div>
            <p>Task</p>
            <ul>
              <li>completionDate: {`${task.completionDate}`}</li>
              <li>deliverableHash: {`${task.deliverableHash}`}</li>
              <li>domainId: {task.domainId}</li>
              <li>dueDate: {`${task.dueDate}`}</li>
              <li>id: {task.id}</li>
              <li>potId: {task.potId}</li>
              <li>skillId: {task.skillId}</li>
              <li>specificationHash: {task.specificationHash}</li>
              <li>status: {task.status}</li>
              <li>worker: {`${task.worker.address}`}</li>
            </ul>
            <p>Pot</p>
            <ul>
              <li>payout (TKN): {task.pot.payout}</li>
              <li>payoutsWeCannotMake: {task.pot.payoutsWeCannotMake}</li>
              <li>type: {task.pot.type}</li>
              <li>typeId: {task.pot.typeId}</li>
            </ul>
          </div>
        ) : (
          <p>loading...</p>
        )}
        {task && !task.worker && (
          <div className={styles.buttons}>
            <Button
              appearance={{ theme: 'primary' }}
              disabled={!task || (task && task.worker)}
              onClick={handleStartWork}
              text={MSG.buttonStartWork}
              type="submit"
            />
          </div>
        )}
        {task &&
          task.worker &&
          task.worker.address &&
          task.worker.address.toLowerCase() === wallet.address && (
            <div className={styles.buttons}>
              <Button
                appearance={{ theme: 'primary' }}
                onClick={handleSubmitWork}
                text={MSG.buttonSubmitWork}
                type="submit"
              />
              <Button
                appearance={{ theme: 'primary' }}
                onClick={handleSubmitRating}
                text={MSG.buttonSubmitRating}
                type="submit"
              />
              <Button
                appearance={{ theme: 'primary' }}
                onClick={handleRevealRating}
                text={MSG.buttonRevealRating}
                type="submit"
              />
              <Button
                appearance={{ theme: 'primary' }}
                onClick={handleRevealRating}
                text={MSG.buttonRevealRating}
                type="submit"
              />
              <Button
                appearance={{ theme: 'primary' }}
                onClick={handleClaimPayout}
                text={MSG.buttonClaimPayout}
                type="submit"
              />
            </div>
          )}
        {task &&
          task.manager &&
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
                onClick={handleSubmitRating}
                text={MSG.buttonSubmitRating}
                type="submit"
              />
              <Button
                appearance={{ theme: 'primary' }}
                onClick={handleRevealRating}
                text={MSG.buttonRevealRating}
                type="submit"
              />
              <Button
                appearance={{ theme: 'primary' }}
                onClick={handleRevealRating}
                text={MSG.buttonRevealRating}
                type="submit"
              />
              <Button
                appearance={{ theme: 'primary' }}
                onClick={handleFinalizeTask}
                text={MSG.buttonFinalizeTask}
                type="submit"
              />
              <Button
                appearance={{ theme: 'primary' }}
                onClick={handleClaimPayout}
                text={MSG.buttonClaimPayout}
                type="submit"
              />
            </div>
          )}
      </div>
    </>
  );
};

Task.displayName = displayName;

export default Task;
