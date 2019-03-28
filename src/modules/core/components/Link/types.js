/* @flow */
import type { Node } from 'react';
import type { IntlShape, MessageDescriptor } from 'react-intl';

export type Arrow = 'right' | 'left';

export type InProps = {
  arrow?: Arrow,
  children?: Node,
  className?: string,
  href: string,
  persistLocale?: boolean,
  text?: MessageDescriptor | string,
  textValues?: Object,
  /** Text transformation to apply to the `href`. Only called if `isInernal` is true. */
  transformUrl?: (href: string) => string,
};

export type OutProps = InProps & {
  /** Injected by `injectIntl` */
  intl: IntlShape,
  isInternal: boolean,
  target?: '_blank',
  rel?: 'noopener noreferrer',
};
