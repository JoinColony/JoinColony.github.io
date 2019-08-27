/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Contributions = (props: Object) =>
  createElement(Dashboard, { page: 'contributions', ...props });

export default Contributions;
