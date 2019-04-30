/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Account = () => createElement(Dashboard, { active: 'account' });

export default Account;
