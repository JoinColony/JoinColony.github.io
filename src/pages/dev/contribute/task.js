/* @flow */

import { createElement } from 'react';

import Contribute from '~pages/Contribute';

const Task = (props: Object) =>
  createElement(Contribute, { page: 'task', ...props });

export default Task;
