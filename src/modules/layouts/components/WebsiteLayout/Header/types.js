/* @flow */

export type Appearance = {|
  theme?: 'light' | 'transparent',
  logoTheme?: 'light' | 'dark',
  navTheme?: 'light' | 'dark',
|};

export type Props = {|
  appearance?: Appearance,
|};
