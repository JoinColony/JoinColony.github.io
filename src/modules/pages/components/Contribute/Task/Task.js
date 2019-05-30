/* @flow */
import { compose, nest } from 'recompose';
import { injectIntl } from 'react-intl';

import DeveloperPortalLayout from '~layouts/DeveloperPortalLayout';

import Task from './Task.jsx';

const enhance = compose(injectIntl);

export default nest<{}>(DeveloperPortalLayout, enhance(Task));
