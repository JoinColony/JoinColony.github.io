/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Close = (props: Object) =>
  createElement(Dashboard, { page: 'close', ...props });

export default Close;
