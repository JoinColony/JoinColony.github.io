/* @flow */

import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';

const Colonies = () => createElement(Dashboard, { active: 'colonies' });

export default Colonies;
