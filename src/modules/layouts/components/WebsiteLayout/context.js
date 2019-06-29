/* @flow */

import { createContext } from 'react';

type ThemeContextType = {|
  headerHeight: number,
|};

const defaultContext: ThemeContextType = { headerHeight: 0 };

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export default ThemeContext;
