/* @flow */

import type { ComponentType } from 'react';

import { fromRenderProps } from 'recompose';

import FileContext from '~context/FileContext';

// eslint-disable-next-line import/prefer-default-export
export const withFileContext = () => (BaseComponent: ComponentType<Object>) =>
  // $FlowFixMe
  fromRenderProps(FileContext.Consumer, files => ({ files }))(BaseComponent);
