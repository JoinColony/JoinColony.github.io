/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { sha3 } from 'web3-utils';

import type { Contribution } from '~types';

import ipfs from '~layouts/DeveloperPortalLayout/ipfs';

import Button from '~core/Button';
import Input from '~core/Input';

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
  labelPullRequest: {
    id: 'pages.Contribute.Task.labelPullRequest',
    defaultMessage: 'Pull Request',
  },
  labelRating: {
    id: 'pages.Contribute.Task.labelRating',
    defaultMessage: 'Rating',
  },
  labelRatingSecret: {
    id: 'pages.Contribute.Task.labelRatingSecret',
    defaultMessage: 'Rating Secret',
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
  contribution: Contribution,
  task: Task,
  setContribution: (contribution: Contribution) => void,
  setError: (error: string) => void,
  setTask: (task: Task) => void,
  wallet: WalletObjectType,
|};

const server = process.env.SERVER_URL || 'http://localhost:8080';

const TaskActions = ({
  colonyClient,
  contribution,
  task,
  setContribution,
  setError,
  setTask,
  wallet,
}: Props) => {
  const [pullRequest, setPullRequest] = useState('');
  const [rating, setRating] = useState(2);
  const [ratingSecret, setRatingSecret] = useState('');

  const manager =
    task.manager &&
    task.manager.address &&
    task.manager.address.toLowerCase() === wallet.address;

  const worker =
    task.worker &&
    task.worker.address &&
    task.worker.address.toLowerCase() === wallet.address;

  const canApproveWorker = contribution.operations[0];

  const canClaimPayout =
    task.status === 'FINALIZED' && task.potPayout.toString() !== '0';

  const canFinalizeTask =
    task.completionDate &&
    task.manager.rating !== 0 &&
    task.worker.rating !== 0 &&
    task.status === 'ACTIVE';

  const canRevealRating =
    (worker && task.completionDate && task.manager.rating === 0) ||
    (manager && task.completionDate && task.worker.rating === 0);

  const canSubmitRating =
    (worker && task.completionDate && task.ratings.count === 0) ||
    (manager && task.completionDate && task.ratings.count === 1);

  const canSubmitWork = worker && !task.completionDate;

  const handleApproveWorker = async () => {
    const operationJSON = contribution.operations[0];
    if (operationJSON) {
      const operation = await colonyClient.setTaskWorkerRole.restoreOperation(
        operationJSON,
      );
      await operation.sign();
      // TODO The gas limit needs to be fixed in colonyJS
      await operation.send({ gasLimit: 1000000 });
      const taskRole = await colonyClient.getTaskRole.call({
        taskId: task.id,
        role: 'WORKER',
      });
      setTask({ ...task, worker: taskRole });
      const operations = contribution.operations.shift();
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operations }),
      };
      // eslint-disable-next-line no-undef
      fetch(`${server}/api/contribution?type=task&typeId=${task.id}`, options)
        .then(res => res.json())
        .then(data => {
          setContribution(data.contribution);
        })
        .catch(fetchError => {
          setError(fetchError.message);
        });
    }
  };

  const handelChangePullRequest = event => {
    setPullRequest(event.currentTarget.value);
  };

  const handelChangeRating = event => {
    setRating(event.currentTarget.value);
  };

  const handelChangeRatingSecret = event => {
    setRatingSecret(event.currentTarget.value);
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
      potPayout: payout,
    });
  };

  const handleFinalizeTask = async () => {
    await colonyClient.finalizeTask.send({ taskId: task.id }, {});
    const result = await colonyClient.getTask.call({
      taskId: task.id,
    });
    setTask({ ...task, ...result });
  };

  const handleRevealRating = async () => {
    const salt = sha3(ratingSecret);
    await colonyClient.revealTaskWorkRating.send(
      {
        taskId: task.id,
        role: worker ? 'MANAGER' : 'WORKER',
        rating,
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

  const handleStartWork = async () => {
    if (wallet.address) {
      const operation = await colonyClient.setTaskWorkerRole.startOperation({
        taskId: task.id,
        // $FlowFixMe See https://github.com/JoinColony/colonyJS/pull/416
        address: wallet.address,
      });
      await operation.sign();
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: operation.toJSON() }),
      };
      // eslint-disable-next-line no-undef
      fetch(`${server}/api/contribution?type=task&typeId=${task.id}`, options)
        .then(res => res.json())
        .then(data => {
          setContribution(data.contribution);
        })
        .catch(fetchError => {
          setError(fetchError.message);
        });
    }
  };

  const handleSubmitRating = async () => {
    const { secret } = await colonyClient.generateSecret.call({
      salt: sha3(ratingSecret),
      value: rating,
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

  const handleSubmitWork = async () => {
    await ipfs.init();
    const deliverableHash = await ipfs.saveHash(pullRequest);
    await ipfs.stop();
    await colonyClient.submitTaskDeliverable.send(
      {
        taskId: task.id,
        deliverableHash,
      },
      {},
    );
    const result = await colonyClient.getTask.call({
      taskId: task.id,
    });
    setTask({ ...task, ...result });
  };

  return (
    <div className={styles.main}>
      {task.worker && !task.worker.address && (
        <div className={styles.section}>
          <Button
            appearance={{ theme: 'primary' }}
            disabled={canApproveWorker}
            onClick={handleStartWork}
            text={MSG.buttonStartWork}
            type="submit"
          />
        </div>
      )}
      {worker && (
        <div className={styles.section}>
          <Button
            appearance={{ theme: 'primary' }}
            disabled={!canSubmitWork}
            onClick={handleSubmitWork}
            text={MSG.buttonSubmitWork}
            type="submit"
          />
          <Button
            appearance={{ theme: 'primary' }}
            disabled={!canSubmitRating}
            onClick={handleSubmitRating}
            text={MSG.buttonSubmitRating}
            type="submit"
          />
          <Button
            appearance={{ theme: 'primary' }}
            disabled={canRevealRating}
            onClick={handleRevealRating}
            text={MSG.buttonRevealRating}
            type="submit"
          />
          <Button
            appearance={{ theme: 'primary' }}
            disabled={!canClaimPayout}
            onClick={handleClaimPayout}
            text={MSG.buttonClaimPayout}
            type="submit"
          />
        </div>
      )}
      {manager && (
        <div className={styles.section}>
          <Button
            appearance={{ theme: 'primary' }}
            disabled={!canApproveWorker}
            onClick={handleApproveWorker}
            text={MSG.buttonApproveWorker}
            type="submit"
          />
          <Button
            appearance={{ theme: 'primary' }}
            disabled={!canSubmitRating}
            onClick={handleSubmitRating}
            text={MSG.buttonSubmitRating}
            type="submit"
          />
          <Button
            appearance={{ theme: 'primary' }}
            disabled={!canRevealRating}
            onClick={handleRevealRating}
            text={MSG.buttonRevealRating}
            type="submit"
          />
          <Button
            appearance={{ theme: 'primary' }}
            disabled={!canFinalizeTask}
            onClick={handleFinalizeTask}
            text={MSG.buttonFinalizeTask}
            type="submit"
          />
        </div>
      )}
      <div className={styles.section}>
        {(canSubmitRating || canRevealRating) && (
          <>
            <Input
              appearance={{
                padding: 'huge',
                width: 'large',
              }}
              id="rating"
              onChange={handelChangeRating}
              label={MSG.labelRating}
              type="number"
              value={rating}
            />
            <Input
              appearance={{
                padding: 'huge',
                width: 'large',
              }}
              id="ratingSecret"
              onChange={handelChangeRatingSecret}
              label={MSG.labelRatingSecret}
              type="text"
              value={ratingSecret}
            />
          </>
        )}
        {canSubmitWork && (
          <Input
            appearance={{
              padding: 'huge',
              width: 'large',
            }}
            id="pullRequest"
            onChange={handelChangePullRequest}
            label={MSG.labelPullRequest}
            type="text"
            value={pullRequest}
          />
        )}
      </div>
    </div>
  );
};

TaskActions.displayName = displayName;

export default TaskActions;
