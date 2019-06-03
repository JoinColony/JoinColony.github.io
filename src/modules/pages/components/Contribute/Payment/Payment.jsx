/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';

import React, { useEffect, useMemo, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Link from '~core/Link';

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
});

const displayName = 'pages.Contribute.PaymentPage';

type Payment = {|
  finalized: boolean,
  id: number,
  payout: number,
  recipient: string,
|};

type Props = {|
  colonyClient: ColonyClient,
  path: string,
|};

const server = process.env.SERVER_URL || 'http://localhost:8080';

const PaymentPage = ({ colonyClient }: Props) => {
  const [contribution, setContribution] = useState(null);
  const [error, setError] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [payment, setPayment] = useState<?Payment>(null);

  const paymentId: ?number = useMemo(() => {
    if (typeof window !== 'undefined') {
      const paymentIdString = window.location.search.split('id=')[1];
      if (paymentIdString) return Number(paymentIdString);
      return null;
    }
    return null;
  }, []);

  useEffect(() => {
    if (!loadedLocal && paymentId) {
      const localPayment = getStore(`payment_${paymentId}`);
      setPayment(localPayment);
      setLoadedLocal(true);
    }
  }, [payment, loadedLocal, paymentId]);

  useEffect(() => {
    if (paymentId) setStore(`payment_${paymentId}`, payment);
  }, [payment, paymentId]);

  useEffect(() => {
    if (paymentId) {
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
            setError(fetchError);
          });
      })();
    }
  }, [paymentId]);

  useEffect(() => {
    if (colonyClient && paymentId) {
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
            payout: payout.toString(),
          });
        } catch (err) {
          setError(err);
        }
      })();
    }
  }, [colonyClient, paymentId]);

  return (
    <div className={styles.main}>
      {error && <p>{error.message}</p>}
      {!error && !payment && !contribution && <p>loading...</p>}
      {payment && contribution && (
        <div>
          <div className={styles.payment}>
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
            <div className={styles.field}>
              <div className={styles.label}>
                <FormattedMessage {...MSG.labelIssue} />
              </div>
              <div className={styles.value}>
                <Link href={contribution.issue} text={contribution.issue} />
              </div>
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
};

PaymentPage.displayName = displayName;

export default PaymentPage;
