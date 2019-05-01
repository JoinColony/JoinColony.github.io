/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Close = () => createElement(Dashboard, { page: 'close' });

export default Close;
