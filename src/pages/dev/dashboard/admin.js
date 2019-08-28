/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Admin = (props: Object) =>
  createElement(Dashboard, { page: 'admin', ...props });

export default Admin;
