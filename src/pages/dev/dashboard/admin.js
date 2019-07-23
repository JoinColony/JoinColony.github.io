/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Admin = () => createElement(Dashboard, { page: 'admin' });

export default Admin;
