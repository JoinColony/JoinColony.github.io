/* @flow */

import type { IntlShape, MessageDescriptor } from 'react-intl';

export type Appearance = {|
  theme?: 'light' | 'transparent' | 'scrolled',
  logoTheme?: 'light' | 'dark',
  navTheme?: 'light' | 'dark',
|};

export type Props = {|
  appearance?: Appearance,
  intl: IntlShape,
  /**
   * If value is smaller than header height, header height will be used
   * instead. This prevents 2 navs from being visible at any one time.
   */
  showOnScrollHeight?: number,
|};

export type DropdownNavItem = {|
  body: MessageDescriptor,
  href: string,
  title: MessageDescriptor,
|};
