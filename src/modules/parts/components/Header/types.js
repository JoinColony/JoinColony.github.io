/* @flow */
import type { CommonRouteProps } from '@reach/router';

import type { Project } from '~types';

export type InProps = {|
  projects: Array<Project>,
|};

export type EnhancedProps = {| ...InProps, ...CommonRouteProps |};
