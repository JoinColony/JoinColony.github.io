/* @flow */
import type { ComponentType } from 'react';
import type { CommonRouteProps } from '@reach/router';

import { Location } from '@reach/router';
import { fromRenderProps } from 'recompose';

// eslint-disable-next-line import/prefer-default-export
export const withLocation = () => (BaseComponent: ComponentType<Object>) =>
  // $FlowFixMe
  fromRenderProps(Location, (locationProps): CommonRouteProps => locationProps)(
    BaseComponent,
  );
