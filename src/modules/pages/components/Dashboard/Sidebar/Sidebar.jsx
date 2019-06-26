/* @flow */

import React from 'react';

import { defineMessages } from 'react-intl';

import type { Network, User } from '~types';

import Link from '~core/Link';

import styles from './Sidebar.module.css';

const MSG = defineMessages({
  adminLink: {
    id: 'pages.Dashboard.Sidebar.adminLink',
    defaultMessage: 'Admin',
  },
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
  network: ?Network,
  user: ?User,
|};

const displayName = 'pages.Dashboard.Sidebar';

const Sidebar = ({ active, network, user }: Props) => (
  <div className={styles.main}>
    <div>
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
      {user && network && user.admin && user.admin[network.slug] && (
        <Link
          className={active === 'admin' ? styles.linkActive : styles.link}
          href="/dashboard/admin"
          text={MSG.adminLink}
        />
      )}
    </div>
  </div>
);

Sidebar.displayName = displayName;

export default Sidebar;
