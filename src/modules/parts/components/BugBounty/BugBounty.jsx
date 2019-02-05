/* @flow */
import React from 'react';
import Link from '~core/Link';

import styles from './BugBounty.module.css';

const displayName = 'parts.BugBounty';

const BugBounty = () => (
  <Link
    className={styles.container}
    href="/docs/colonynetwork/bug-bounty-program-overview/"
  >
    <span className={styles.leftText}>Secure the network</span>
    <span className={styles.boldText}>Bug Bounty 2019</span>
  </Link>
);

BugBounty.displayName = displayName;

export default BugBounty;
