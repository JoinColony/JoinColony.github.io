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
  buttonStartWork: {
    id: 'pages.Contribute.Task.buttonStartWork',
    defaultMessage: 'Start Work',
  },
});

const displayName = 'pages.Contribute.Task';

type Props = {|
  networkClient: ?ColonyNetworkClient,
  wallet: ?WalletObjectType,
|};

const Task = ({ networkClient }: Props) => {
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (!loadedLocal) {
      const localTask = getStore('task#1');
      setTask(localTask);
      setLoadedLocal(true);
    }
  }, [task, loadedLocal]);

  useEffect(() => setStore('task#1', task), [task]);

  useEffect(() => {
    if (!task && networkClient) {
      (async () => {
        const colonyClient = await networkClient.getColonyClientByAddress(
          '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
        );
        const result = await colonyClient.getTask.call({
          taskId: 1,
        });
        const worker = await colonyClient.getTaskRole.call({
          taskId: 1,
          role: 'WORKER',
        });
        const pot = await colonyClient.getFundingPot.call({
          potId: result.potId,
        });
        const { payout } = await colonyClient.getFundingPotPayout.call({
          potId: result.potId,
          token: colonyClient.tokenClient.contract.address,
        });
        setTask({ ...result, worker, pot: { payout, ...pot } });
      })();
    }
  });

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
              <li>payout (TKN): {task.pot.payout.toString()}</li>
              <li>payoutsWeCannotMake: {task.pot.payoutsWeCannotMake}</li>
              <li>type: {task.pot.type}</li>
              <li>typeId: {task.pot.typeId}</li>
            </ul>
          </div>
        ) : (
          <p>loading...</p>
        )}
        <Button
          appearance={{ theme: 'primary' }}
          text={MSG.buttonStartWork}
          type="submit"
        />
      </div>
    </>
  );
};

Task.displayName = displayName;

export default Task;
