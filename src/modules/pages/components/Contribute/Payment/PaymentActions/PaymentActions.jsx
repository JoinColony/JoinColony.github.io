/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';

import styles from './PaymentActions.module.css';

const MSG = defineMessages({
  buttonClaimPayout: {
    id: 'pages.Contribute.Payment.buttonClaimPayout',
    defaultMessage: 'Claim Payout',
  },
});

const displayName = 'pages.Contribute.Payment.PaymentActions';

type Payment = {|
  finalized: boolean,
  id: number,
  potId: number,
  potPayout: number,
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
      potPayout: payout,
    });
  };

  const recipient =
    payment.recipient && payment.recipient.toLowerCase() === wallet.address;

  return (
    <div className={styles.main}>
      {payment && recipient && (
        <div className={styles.buttons}>
          <Button
            disabled={
              !payment.finalized || payment.potPayout.toString() === '0'
            }
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
