/* @flow */
import { injectIntl } from 'react-intl';
import { compose } from 'recompose';

import { withFileContext } from '../../../core/hoc/files';
import { withLocation } from '../../../core/hoc/location';

import SEO from './SEO.jsx';

const enhance = compose(
  injectIntl,
  withFileContext(),
  withLocation(),
);

export default enhance(SEO);
