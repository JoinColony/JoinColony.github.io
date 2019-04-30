/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Contributions = () =>
  createElement(Dashboard, { active: 'contributions' });

export default Contributions;
