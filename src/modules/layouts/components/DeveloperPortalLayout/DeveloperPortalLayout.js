/* @flow */
import { compose, nest } from 'recompose';
import { injectIntl } from 'react-intl';

import type { GlobalLayoutProps } from '~layouts/GlobalLayout/GlobalLayout.jsx';

import GlobalLayout from '~layouts/GlobalLayout';

import DeveloperPortalLayout from './DeveloperPortalLayout.jsx';

const enhance = compose(injectIntl);

export default nest<GlobalLayoutProps>(
  GlobalLayout,
  enhance(DeveloperPortalLayout),
);
