/* @flow */
import { compose, nest } from 'recompose';
import { injectIntl } from 'react-intl';

import DeveloperPortalLayout from '~layouts/DeveloperPortalLayout';

import Payment from './Payment.jsx';

const enhance = compose(injectIntl);

export default nest<{}>(DeveloperPortalLayout, enhance(Payment));
