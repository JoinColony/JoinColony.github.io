/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';

import styles from './PaymentActions.module.css';

const MSG = defineMessages({
  buttonApproveWorker: {
    id: 'pages.Contribute.Payment.buttonApproveWorker',
    defaultMessage: 'Approve Worker',
  },
  buttonStartWork: {
    id: 'pages.Contribute.Payment.buttonStartWork',
    defaultMessage: 'Start Work',
  },
  buttonSubmitWork: {
    id: 'pages.Contribute.Payment.buttonSubmitWork',
    defaultMessage: 'Submit Work',
  },
  buttonSubmitRating: {
    id: 'pages.Contribute.Payment.buttonSubmitRating',
    defaultMessage: 'Submit Rating',
  },
  buttonRevealRating: {
    id: 'pages.Contribute.Payment.buttonRevealRating',
    defaultMessage: 'Reveal Rating',
  },
  buttonFinalizePayment: {
    id: 'pages.Contribute.Payment.buttonFinalizePayment',
    defaultMessage: 'Finalize Payment',
  },
  buttonClaimPayout: {
    id: 'pages.Contribute.Payment.buttonClaimPayout',
    defaultMessage: 'Claim Payout',
  },
});

const displayName = 'pages.Contribute.Payment.PaymentActions';

type Payment = {|
  finalized: boolean,
  id: number,
  payout: number,
  potId: number,
  recipient: string,
|};

type Props = {|
  colonyClient: ColonyClient,
  payment: Payment,
  setPayment: (payment: Payment) => void,
  wallet: WalletObjectType,
|};

const PaymentActions = ({
  colonyClient,
  payment,
  setPayment,
  wallet,
}: Props) => {
  const handleClaimPayout = async () => {
    await colonyClient.claimPayment.send(
      {
        paymentId: payment.id,
        token: colonyClient.tokenClient.contract.address,
      },
      {},
    );
    const { payout } = await colonyClient.getFundingPotPayout.call({
      potId: payment.potId,
      token: colonyClient.tokenClient.contract.address,
    });
    setPayment({
      ...payment,
      payout: payout.toString(),
    });
  };

  const recipient =
    payment.recipient && payment.recipient.toLowerCase() === wallet.address;

  return (
    <div className={styles.main}>
      {payment && recipient && (
        <div className={styles.buttons}>
          <Button
            appearance={{ theme: 'primary' }}
            disabled={!payment.finalized || payment.payout === '0'}
            onClick={handleClaimPayout}
            text={MSG.buttonClaimPayout}
            type="submit"
          />
        </div>
      )}
    </div>
  );
};

PaymentActions.displayName = displayName;

export default PaymentActions;
