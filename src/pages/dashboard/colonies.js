/* @flow */
import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';
import Colonies from '~pages/Dashboard/Colonies';

const ColoniesPage = () =>
  createElement(Dashboard, {
    content: createElement(Colonies, { active: 'colonies', wallet: null }),
  });

export default ColoniesPage;
