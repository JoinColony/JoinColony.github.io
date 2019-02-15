/* @flow */
import { nest } from 'recompose';

import type { GlobalLayoutProps } from '~layouts/GlobalLayout/GlobalLayout.jsx';

import GlobalLayout from '~layouts/GlobalLayout';

import MainLayout from './MainLayout.jsx';

export default nest<GlobalLayoutProps>(GlobalLayout, MainLayout);
