/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Account = (props: Object) =>
  createElement(Dashboard, { page: 'account', ...props });

export default Account;
