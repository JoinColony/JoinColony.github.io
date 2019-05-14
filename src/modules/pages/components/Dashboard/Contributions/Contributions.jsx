/* @flow */
/* eslint-disable react/no-unused-prop-types */

import type { WalletObjectType } from '@colony/purser-core';

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { User } from '~types';

import styles from './Contributions.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Dashboard.Contributions.title',
    defaultMessage: 'Contributions',
  },
});

type Props = {|
  path: string,
  user: User,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Contributions';

const Contributions = ({ wallet }: Props) => (
  <>
    <div className={styles.main}>
      <h1>
        <FormattedMessage {...MSG.title} />
      </h1>
      {wallet.address}
    </div>
  </>
);

Contributions.displayName = displayName;

export default Contributions;
