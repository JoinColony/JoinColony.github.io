/* @flow */
import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';
import Account from '~pages/Dashboard/Account';

const AccountPage = () =>
  createElement(Dashboard, {
    content: createElement(Account, { active: 'account', wallet: null }),
  });

export default AccountPage;
