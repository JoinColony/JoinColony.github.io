/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Account = () => createElement(Dashboard, { page: 'account' });

export default Account;
