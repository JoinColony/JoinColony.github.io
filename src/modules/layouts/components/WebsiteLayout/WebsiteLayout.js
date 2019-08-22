/* @flow */

import { nest } from 'recompose';

import type { GlobalLayoutProps } from '~layouts/GlobalLayout/GlobalLayout.jsx';

import GlobalLayout from '~layouts/GlobalLayout';

import WebsiteLayout from './WebsiteLayout.jsx';

export default nest<GlobalLayoutProps>(GlobalLayout, WebsiteLayout);
