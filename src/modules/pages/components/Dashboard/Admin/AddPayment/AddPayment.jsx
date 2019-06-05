/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { BN } from 'web3-utils';

import Button from '~core/Button';
import Input from '~core/Input';
import Link from '~core/Link';

import styles from './AddPayment.module.css';

const MSG = defineMessages({
  buttonAddPayment: {
    id: 'pages.Dashboard.Admin.AddPayment.buttonAddPayment',
    defaultMessage: 'Add Payment',
  },
  contributionLink: {
    id: 'pages.Dashboard.Admin.AddPayment.contributionLink',
    defaultMessage: 'Sucess! Click here to view the payment.',
  },
  labelAmount: {
    id: 'pages.Dashboard.Admin.AddPayment.labelAmount',
    defaultMessage: 'Payout Amount',
  },
  labelIssue: {
    id: 'pages.Dashboard.Admin.AddPayment.labelIssue',
    defaultMessage: 'GitHub Issue URL (issue or pull request required)',
  },
  labelPullRequest: {
    id: 'pages.Dashboard.Admin.AddPayment.labelPullRequest',
    defaultMessage: 'GitHub Pull Request URL (issue or pull request required)',
  },
  labelRecipient: {
    id: 'pages.Dashboard.Admin.AddPayment.labelRecipient',
    defaultMessage: 'Recipient Ethereum Address',
  },
  labelSkillId: {
    id: 'pages.Dashboard.Admin.AddPayment.labelSkillId',
    defaultMessage: 'Skill ID',
  },
  labelUsername: {
    id: 'pages.Dashboard.Admin.AddPayment.labelUsername',
    defaultMessage: 'Recipient GitHub Username',
  },
});

const displayName = 'pages.Contribute.AddPayment';

type Props = {|
  colonyClient: ?ColonyClient,
|};

const server = process.env.SERVER_URL || 'http://localhost:8080';

const AddPayment = ({ colonyClient }: Props) => {
  const [amount, setAmount] = useState(0);
  const [contribution, setContribution] = useState(null);
  const [error, setError] = useState(null);
  const [issue, setIssue] = useState('');
  const [pullRequest, setPullRequest] = useState('');
  const [recipient, setRecipient] = useState('');
  const [skillId, setSkillId] = useState(0);
  const [username, setUsername] = useState('');

  const handleAddPayment = async () => {
    if (
      colonyClient &&
      amount &&
      (issue || pullRequest) &&
      recipient &&
      skillId &&
      username
    ) {
      const addPaymentResponse = await colonyClient.addPayment.send(
        {
          recipient,
          token: colonyClient.tokenClient.contract.address,
          amount: new BN(amount),
          domainId: 1,
          skillId: Number(skillId),
        },
        {},
      );
      // $FlowFixMe
      const { paymentId } = addPaymentResponse.eventData;
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issue,
          payout: amount,
          pullRequest,
          type: 'payment',
          typeId: paymentId,
          username,
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
    }
  };

  const handleChangeAmount = event => {
    if (contribution) setContribution(null);
    if (error) setError(null);
    setAmount(event.currentTarget.value);
  };

  const handleChangeIssue = event => {
    if (contribution) setContribution(null);
    if (error) setError(null);
    setIssue(event.currentTarget.value);
  };

  const handleChangePullRequest = event => {
    if (contribution) setContribution(null);
    if (error) setError(null);
    setPullRequest(event.currentTarget.value);
  };

  const handleChangeRecipient = event => {
    if (contribution) setContribution(null);
    if (error) setError(null);
    setRecipient(event.currentTarget.value);
  };

  const handleChangeSkillId = event => {
    if (contribution) setContribution(null);
    if (error) setError(null);
    setSkillId(event.currentTarget.value);
  };

  const handleChangeUsername = event => {
    if (contribution) setContribution(null);
    if (error) setError(null);
    setUsername(event.currentTarget.value);
  };

  return (
    <div className={styles.main}>
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
          id="pullRequest"
          label={MSG.labelPullRequest}
          onChange={handleChangePullRequest}
          type="text"
          value={pullRequest}
        />
      </div>
      <div className={styles.field}>
        <Input
          appearance={{
            padding: 'huge',
            width: 'stretch',
          }}
          id="username"
          label={MSG.labelUsername}
          onChange={handleChangeUsername}
          type="text"
          value={username}
        />
      </div>
      <div className={styles.field}>
        <Input
          appearance={{
            padding: 'huge',
            width: 'stretch',
          }}
          id="recipient"
          label={MSG.labelRecipient}
          onChange={handleChangeRecipient}
          type="text"
          value={recipient}
        />
      </div>
      <div className={styles.field}>
        <Button
          appearance={{
            theme: 'primary',
            padding: 'huge',
            width: 'stretch',
          }}
          disabled={
            !amount ||
            (!pullRequest && !issue) ||
            !recipient ||
            !skillId ||
            !username
          }
          onClick={handleAddPayment}
          text={MSG.buttonAddPayment}
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

AddPayment.displayName = displayName;

export default AddPayment;
