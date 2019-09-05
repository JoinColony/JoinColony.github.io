/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';

import type { Network } from '~types';

import Button from '~core/Button';
import ErrorMessage from '~core/ErrorMessage';
import SpinnerLoader from '~core/SpinnerLoader';
import useColonyRoles from '~layouts/DeveloperPortalLayout/useColonyRoles';

import AddAdmin from './AddAdmin';
import AddPayment from './AddPayment';
import AddTask from './AddTask';

import styles from './Admin.module.css';

const MSG = defineMessages({
  buttonAddAdmin: {
    id: 'pages.Dashboard.Admin.buttonAddAdmin',
    defaultMessage: 'Add Admin',
  },
  buttonAddPayment: {
    id: 'pages.Dashboard.Admin.buttonAddPayment',
    defaultMessage: 'Add Payment',
  },
  buttonAddTask: {
    id: 'pages.Dashboard.Admin.buttonAddTask',
    defaultMessage: 'Add Task',
  },
  unauthorized: {
    id: 'pages.Dashboard.Admin.unauthorized',
    defaultMessage: 'Unauthorized',
  },
});

const displayName = 'pages.Dashboard.Admin';

type Props = {|
  colonyClient: ?ColonyClient,
  network: Network,
  /* eslint-disable-next-line react/no-unused-prop-types */
  path: string,
  wallet: WalletObjectType,
|};

const Admin = ({ colonyClient, network, wallet }: Props) => {
  const [visible, setVisible] = useState('AddAdmin');
  const { admin, loading } = useColonyRoles(colonyClient, wallet);
  if (loading) {
    return (
      <div className={styles.loading}>
        <SpinnerLoader appearance={{ theme: 'primary', size: 'huge' }} />
      </div>
    );
  }
  if (!admin) {
    return <ErrorMessage error={MSG.unauthorized} />;
  }
  return (
    <>
      <div className={styles.main}>
        <div className={styles.menu}>
          <Button
            appearance={{
              theme: 'reset',
              font: 'small',
              color: visible === 'AddAdmin' ? 'blue' : 'grey',
              weight: 'medium',
            }}
            onClick={() => setVisible('AddAdmin')}
            text={MSG.buttonAddAdmin}
            type="submit"
          />
          <Button
            appearance={{
              theme: 'reset',
              font: 'small',
              color: visible === 'AddPayment' ? 'blue' : 'grey',
              weight: 'medium',
            }}
            onClick={() => setVisible('AddPayment')}
            text={MSG.buttonAddPayment}
            type="submit"
          />
          <Button
            appearance={{
              theme: 'reset',
              font: 'small',
              color: visible === 'AddTask' ? 'blue' : 'grey',
              weight: 'medium',
            }}
            onClick={() => setVisible('AddTask')}
            text={MSG.buttonAddTask}
            type="submit"
          />
        </div>
        <div className={styles.content}>
          {visible === 'AddAdmin' && (
            <AddAdmin colonyClient={colonyClient} network={network} />
          )}
          {visible === 'AddPayment' && (
            <AddPayment colonyClient={colonyClient} network={network} />
          )}
          {visible === 'AddTask' && (
            <AddTask colonyClient={colonyClient} network={network} />
          )}
        </div>
      </div>
    </>
  );
};

Admin.displayName = displayName;

export default Admin;
