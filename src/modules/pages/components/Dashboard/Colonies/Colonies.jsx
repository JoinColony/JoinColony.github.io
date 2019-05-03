/* @flow */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';

import { defineMessages, FormattedMessage } from 'react-intl';

import styles from './Colonies.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Dashboard.Colonies.title',
    defaultMessage: 'Colonies',
  },
});

type Props = {|
  github: Object,
  path: string,
  wallet: Object,
|};

const displayName = 'pages.Dashboard.Colonies';

const Colonies = ({ wallet }: Props) => (
  <>
    <div className={styles.main}>
      <h1>
        <FormattedMessage {...MSG.title} />
      </h1>
      {wallet.address}
    </div>
  </>
);

Colonies.displayName = displayName;

export default Colonies;
