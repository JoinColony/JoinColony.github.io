/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Link from '~core/Link';

import PaymentActions from './PaymentActions';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './Payment.module.css';

const MSG = defineMessages({
  labelFinalized: {
    id: 'pages.Contribute.Payment.labelFinalized',
    defaultMessage: 'Finalized',
  },
  labelIssue: {
    id: 'pages.Contribute.Payment.labelIssue',
    defaultMessage: 'Issue',
  },
  labelPayment: {
    id: 'pages.Contribute.Payment.labelPayment',
    defaultMessage: 'Payment',
  },
  labelPayout: {
    id: 'pages.Contribute.Payment.labelPayout',
    defaultMessage: 'Payout',
  },
  labelPullRequest: {
    id: 'pages.Contribute.Payment.labelPullRequest',
    defaultMessage: 'Pull Request',
  },
  labelRecipient: {
    id: 'pages.Contribute.Payment.labelRecipient',
    defaultMessage: 'Recipient',
  },
  loadingPayment: {
    id: 'pages.Contribute.Payment.loadingPayment',
    defaultMessage: 'Loading payment...',
  },
});

const displayName = 'pages.Contribute.PaymentPage';

type Payment = {|
  finalized: boolean,
  id: number,
  potId: number,
  potPayout: number,
  recipient: string,
|};

type Props = {|
  colonyClient: ColonyClient,
  path: string,
  wallet: WalletObjectType,
|};

const server = process.env.SERVER_URL || 'http://localhost:8080';

const PaymentPage = ({ colonyClient, wallet }: Props) => {
  const [contribution, setContribution] = useState(null);
  const [error, setError] = useState(null);
  const [loadedContribution, setLoadedContribution] = useState(false);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [loadedPayment, setLoadedPayment] = useState(false);
  const [payment, setPayment] = useState<?Payment>(null);
  const [paymentId, setPaymentId] = useState<?number>(null);

  useEffect(() => {
    if (!paymentId) {
      if (typeof window !== 'undefined' && window.location.search) {
        const searchId = window.location.search.split('?id=')[1];
        const parsedId = Number(searchId);
        if (parsedId) {
          setPaymentId(parsedId);
        } else {
          setError('Nothing to see here...');
        }
      }
    }
  }, [paymentId]);

  useEffect(() => {
    if (!loadedLocal && paymentId) {
      const localPayment = getStore(`payment_${paymentId}`);
      setPayment(localPayment);
      setLoadedLocal(true);
    }
  }, [loadedLocal, payment, paymentId]);

  useEffect(() => {
    if (payment && paymentId) setStore(`payment_${paymentId}`, payment);
  }, [payment, paymentId]);

  useEffect(() => {
    if (!loadedContribution && paymentId) {
      (async () => {
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        // eslint-disable-next-line no-undef
        fetch(
          `${server}/api/contribution?type=payment&typeId=${paymentId}`,
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
  }, [loadedContribution, paymentId]);

  useEffect(() => {
    if (!loadedPayment && colonyClient && paymentId) {
      (async () => {
        try {
          const result = await colonyClient.getPayment.call({
            paymentId,
          });
          const { payout } = await colonyClient.getFundingPotPayout.call({
            potId: result.potId,
            token: colonyClient.tokenClient.contract.address,
          });
          setPayment({
            ...result,
            id: paymentId,
            potId: result.potId,
            potPayout: payout,
          });
        } catch (colonyError) {
          setError(colonyError.message);
        }
        setLoadedPayment(true);
      })();
    }
  }, [colonyClient, loadedPayment, paymentId]);

  return (
    <div className={styles.main}>
      {!error && !contribution && !payment && (
        <FormattedMessage {...MSG.loadingPayment} />
      )}
      {contribution && payment && (
        <>
          <PaymentActions
            colonyClient={colonyClient}
            setPayment={setPayment}
            payment={payment}
            wallet={wallet}
          />
          <div className={styles.content}>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelPayment} />
              </div>
              <div className={styles.value}>{payment.id}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelFinalized} />
              </div>
              <div className={styles.value}>{payment.finalized.toString()}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelPayout} />
              </div>
              <div className={styles.value}>
                {`${contribution.payout} CDEV`}
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelRecipient} />
              </div>
              <div className={styles.value}>
                {`@${contribution.username} (${payment.recipient})`}
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
        </>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

PaymentPage.displayName = displayName;

export default PaymentPage;
