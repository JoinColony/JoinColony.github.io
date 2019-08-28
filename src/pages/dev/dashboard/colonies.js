/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Colonies = (props: Object) =>
  createElement(Dashboard, { page: 'colonies', ...props });

export default Colonies;
