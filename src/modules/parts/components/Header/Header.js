/* @flow */
import type { HOC } from 'recompose';

import { Location } from '@reach/router';
import { compose, fromRenderProps } from 'recompose';

import type { EnhancedProps, InProps } from './types';

import Header from './Header.jsx';

const enhance: HOC<EnhancedProps, InProps> = compose(
  // $FlowFixMe
  fromRenderProps(Location, locationProps => locationProps),
);

export default enhance(Header);
