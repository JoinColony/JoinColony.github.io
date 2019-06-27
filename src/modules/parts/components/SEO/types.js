/* @flow */

import type { RouteProps } from '@reach/router';
import type { IntlShape, MessageDescriptor } from 'react-intl';

import type { FileContext as FileContextType } from '~types';

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
    baseUrl: string,
    /** Injected by `injectIntl` */
    intl: IntlShape,
    files?: FileContextType,
    getAbsoluteImagePath: (imagePath: string) => string,
    siteLogo: string,
  };
