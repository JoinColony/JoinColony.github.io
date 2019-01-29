/* @flow */
import React from 'react';
import Link from '../Link';

import styles from './BugBounty.module.css';

const BugBounty = () => (
  <Link
    className={styles.container}
    href="/colonynetwork/bug-bounty-program-overview/"
  >
    <span className={styles.leftText}>Secure the network</span>
    <span className={styles.boldText}>Bug Bounty 2019</span>
  </Link>
);

export default BugBounty;
