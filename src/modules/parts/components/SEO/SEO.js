/* @flow */
import { injectIntl } from 'react-intl';
import { compose } from 'recompose';

import { withFileContext } from '~hoc/files';
import { withLocation } from '~hoc/location';

import SEO from './SEO.jsx';

const enhance = compose(
  injectIntl,
  withFileContext(),
  withLocation(),
);

export default enhance(SEO);
