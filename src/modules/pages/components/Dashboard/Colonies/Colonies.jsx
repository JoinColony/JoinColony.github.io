/* @flow */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';

import styles from './Colonies.module.css';

type Props = {|
  path: string,
  wallet: Object,
|};

const displayName = 'pages.Dashboard.Colonies';

const Colonies = ({ wallet }: Props) => (
  <>
    <div className={styles.main}>
      <h1>Colonies</h1>
      {wallet.address}
    </div>
  </>
);

Colonies.displayName = displayName;

export default Colonies;
