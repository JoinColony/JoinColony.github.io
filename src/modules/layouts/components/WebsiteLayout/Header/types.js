/* @flow */

export type Appearance = {|
  theme?: 'light' | 'transparent' | 'scrolled',
  logoTheme?: 'light' | 'dark',
  navTheme?: 'light' | 'dark',
|};

export type Props = {|
  appearance?: Appearance,
  showOnScrollHeight?: number,
|};
