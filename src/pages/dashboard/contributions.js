/* @flow */
import { createElement } from 'react';

import Dashboard from '~pages/Dashboard';
import Contributions from '~pages/Dashboard/Contributions';

const ContributionsPage = () =>
  createElement(Dashboard, {
    content: createElement(Contributions, {
      active: 'contributions',
      wallet: null,
    }),
  });

export default ContributionsPage;
