/* @flow */

import type { HOC } from 'recompose';

import { injectIntl } from 'react-intl';
import { compose } from 'recompose';

import { withLocation } from '~hoc/location';

import type { InProps } from './types';

import SEO from './SEO.jsx';

const enhance: HOC<*, InProps> = compose(
  injectIntl,
  withLocation(),
);

export default enhance(SEO);
