/* @flow */

import { createElement } from 'react';

import Contribute from '~pages/Contribute';

const Payment = (props: Object) =>
  createElement(Contribute, { page: 'payment', ...props });

export default Payment;
