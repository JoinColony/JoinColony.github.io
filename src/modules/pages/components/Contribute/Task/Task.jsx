/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

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

  useEffect(() => {
    if (!loadedLocal) {
      const localTask = getStore('task_1');
      const localOperation = getStore('task_1_operation');
      setTask(localTask);
      setPendingOperation(localOperation);
      setLoadedLocal(true);
    }
  }, [task, loadedLocal]);

  useEffect(() => setStore('task_1', task), [task]);
  useEffect(() => setStore('task_1_operation', pendingOperation), [
    pendingOperation,
  ]);

  useEffect(() => {
    if (!loadedTask && networkClient) {
      (async () => {
        setLoadedTask(true);
        const colonyClient = await networkClient.getColonyClientByAddress(
          '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
        );
        const result = await colonyClient.getTask.call({
          taskId: 1,
        });
        const worker = await colonyClient.getTaskRole.call({
          taskId: result.id,
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
          worker,
          pot: { payout: payout.toString(), ...pot },
        });
      })();
    }
  });

  const handleStartWork = async () => {
    const colonyClient = await networkClient.getColonyClientByAddress(
      '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
    );
    const operation = await colonyClient.setTaskWorkerRole.startOperation({
      taskId: 1,
      user: wallet.address,
    });
    await operation.sign();

    // TODO Save the operation to the database
    setStore('task_1_operation', operation.toJSON());
  };

  const handleApproveWorker = async () => {
    // TODO Get the operation from the database
    const operationJSON = getStore('task_1_operation');

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
    setStore('task_1_operation', null);
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
        <div className={styles.buttons}>
          <Button
            appearance={{ theme: 'primary' }}
            disabled={!task || (task && task.worker)}
            onClick={handleStartWork}
            text={MSG.buttonStartWork}
            type="submit"
          />
          <Button
            appearance={{ theme: 'primary' }}
            disabled={!pendingOperation}
            onClick={handleApproveWorker}
            text={MSG.buttonApproveWorker}
            type="submit"
          />
        </div>
      </div>
    </>
  );
};

Task.displayName = displayName;

export default Task;
