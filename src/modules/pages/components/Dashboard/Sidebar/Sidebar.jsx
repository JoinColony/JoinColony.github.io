/* @flow */

import React from 'react';

import { defineMessages } from 'react-intl';

import Link from '~core/Link';

import styles from './Sidebar.module.css';

const MSG = defineMessages({
  accountLink: {
    id: 'pages.Dashboard.Sidebar.accountLink',
    defaultMessage: 'Account',
  },
  coloniesLink: {
    id: 'pages.Dashboard.Sidebar.coloniesLink',
    defaultMessage: 'Colonies',
  },
  contributionsLink: {
    id: 'pages.Dashboard.Sidebar.contributionsLink',
    defaultMessage: 'Contributions',
  },
});

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
        text={MSG.accountLink}
      />
      <Link
        className={active === 'colonies' ? styles.linkActive : styles.link}
        href="/dashboard/colonies"
        text={MSG.coloniesLink}
      />
      <Link
        className={active === 'contributions' ? styles.linkActive : styles.link}
        href="/dashboard/contributions"
        text={MSG.contributionsLink}
      />
    </div>
  </div>
);

Sidebar.displayName = displayName;

export default Sidebar;
