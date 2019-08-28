/* @flow */

import type { RouteProps } from '@reach/router';
import type { IntlShape, MessageDescriptor } from 'react-intl';

export type InProps = {|
  description: MessageDescriptor | string,
  descriptionValues?: Object,
  images?: Array<string>,
  isDocPage?: boolean,
  project?: string,
  title: MessageDescriptor | string,
  titleValues?: Object,
|};

export type OutProps = RouteProps &
  InProps & {
    /** Injected by `injectIntl` */
    intl: IntlShape,
  };
