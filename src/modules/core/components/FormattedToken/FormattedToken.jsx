/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import {
  defineMessages,
  FormattedMessage,
  FormattedNumber,
  injectIntl,
} from 'react-intl';

const MSG = defineMessages({
  token: {
    id: 'parts.FormattedToken.token',
    defaultMessage: '{amount} {symbol}',
  },
});

type Props = {|
  /** Injected by `injectIntl` */
  intl: IntlShape,
  /** Token amount */
  amount: number | string,
  /** Token symbol */
  symbol: 'CDEV',
|};

const tokenFormat = {
  id: 'CDEV',
  maximumFractionDigits: 18,
  minimumFractionDigits: 0,
};

const displayName = 'FormattedToken';

const FormattedToken = ({ amount, symbol, ...rest }: Props) => {
  return (
    <FormattedMessage
      {...MSG.token}
      values={{
        amount: <FormattedNumber {...tokenFormat} value={amount} />,
        symbol,
      }}
      {...rest}
    />
  );
};

FormattedToken.displayName = displayName;

export default injectIntl(FormattedToken);
