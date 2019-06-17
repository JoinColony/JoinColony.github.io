/* @flow */

import React from 'react';

import type { FileContext as FileContextType } from '~types';

const FileContext = React.createContext<FileContextType>({});

export default FileContext;
