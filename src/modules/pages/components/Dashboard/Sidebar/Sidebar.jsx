/* @flow */

import React from 'react';

import Link from '~core/Link';

import styles from './Sidebar.module.css';

type Props = {|
  active: string,
|};

const displayName = 'pages.Dashboard.Sidebar';

const Sidebar = ({ active }: Props) => (
  <div className={styles.main}>
    <div className={styles.content}>
      <Link
        className={active === 'account' ? styles.linkActive : styles.link}
        href="/dashboard/account"
      >
        Account
      </Link>
      <Link
        className={active === 'colonies' ? styles.linkActive : styles.link}
        href="/dashboard/colonies"
      >
        Colonies
      </Link>
      <Link
        className={active === 'contributions' ? styles.linkActive : styles.link}
        href="/dashboard/contributions"
      >
        Contributions
      </Link>
    </div>
  </div>
);

Sidebar.displayName = displayName;

export default Sidebar;
