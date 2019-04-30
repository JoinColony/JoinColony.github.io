/* @flow */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';

import styles from './Contributions.module.css';

type Props = {|
  path: string,
  wallet: Object,
|};

const displayName = 'pages.Dashboard.Contributions';

const Contributions = ({ wallet }: Props) => (
  <>
    <div className={styles.main}>
      <h1>Contributions</h1>
      {wallet.address}
    </div>
  </>
);

Contributions.displayName = displayName;

export default Contributions;
