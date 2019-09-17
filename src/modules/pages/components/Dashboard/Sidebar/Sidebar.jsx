/* @flow */

import React from 'react';

import { defineMessages } from 'react-intl';

import type { Network, User } from '~types';

import {
  PAGE_DEVELOPER_PORTAL_DASHBOARD_ACCOUNT,
  // Temporarily disable next import
  // eslint-disable-next-line no-unused-vars
  PAGE_DEVELOPER_PORTAL_DASHBOARD_ADMIN,
  PAGE_DEVELOPER_PORTAL_DASHBOARD_COLONIES,
  PAGE_DEVELOPER_PORTAL_DASHBOARD_CONTRIBUTIONS,
} from '~routes';

import Link from '~core/Link';

import styles from './Sidebar.module.css';

const MSG = defineMessages({
  accountLink: {
    id: 'pages.Dashboard.Sidebar.accountLink',
    defaultMessage: 'Account',
  },
  adminLink: {
    id: 'pages.Dashboard.Sidebar.adminLink',
    defaultMessage: 'Admin',
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

// Temporarily disable unused props
// eslint-disable-next-line no-unused-vars
const Sidebar = ({ active, network, user }: Props) => (
  <div className={styles.main}>
    <div>
      <Link
        className={active === 'colonies' ? styles.linkActive : styles.link}
        href={PAGE_DEVELOPER_PORTAL_DASHBOARD_COLONIES}
        text={MSG.coloniesLink}
      />
      <Link
        className={active === 'contributions' ? styles.linkActive : styles.link}
        href={PAGE_DEVELOPER_PORTAL_DASHBOARD_CONTRIBUTIONS}
        text={MSG.contributionsLink}
      />
      <Link
        className={active === 'account' ? styles.linkActive : styles.link}
        href={PAGE_DEVELOPER_PORTAL_DASHBOARD_ACCOUNT}
        text={MSG.accountLink}
      />
    </div>
  </div>
);

Sidebar.displayName = displayName;

export default Sidebar;
