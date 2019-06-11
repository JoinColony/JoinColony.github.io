/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import {
  defineMessages,
  FormattedMessage,
  FormattedNumber,
  injectIntl,
} from 'react-intl';

import { getMainClasses } from '~utils/css';

import styles from './FormattedToken.module.css';

const MSG = defineMessages({
  amount: {
    id: 'parts.FormattedToken.amount',
    defaultMessage: '{amount}',
  },
  symbol: {
    id: 'parts.FormattedToken.symbol',
    defaultMessage: ' {symbol}',
  },
});

type Appearance = {
  spacing?: 'large',
  symbolWeight?: 'bold',
};

type Props = {
  /** Appearance object */
  appearance?: Appearance,
  /** Token amount */
  amount: number,
  /** Overwriting class name(s). Setting this will overwrite the `appearance` object */
  className?: string,
  /** Token amount */
  decimals?: number,
  /** Injected by `injectIntl` */
  intl: IntlShape,
  /** Maximum number of fraction digits */
  maximumFractionDigits?: number,
  /** Minimum number of fraction digits */
  minimumFractionDigits?: number,
  /** Token symbol */
  symbol: string,
};

const displayName = 'FormattedToken';

const FormattedToken = ({
  amount,
  appearance,
  className,
  decimals,
  maximumFractionDigits,
  minimumFractionDigits,
  symbol,
}: Props) => {
  const classNames = className || getMainClasses(appearance, styles);
  const formattedAmount = amount / 10 ** (decimals || 18);
  const tokenFormat = {
    id: symbol,
    maximumFractionDigits: maximumFractionDigits || 4,
    minimumFractionDigits: minimumFractionDigits || 0,
  };
  return (
    <div className={classNames}>
      <FormattedMessage
        {...MSG.amount}
        values={{
          amount: <FormattedNumber {...tokenFormat} value={formattedAmount} />,
        }}
      />
      <FormattedMessage {...MSG.symbol} values={{ symbol }} />
    </div>
  );
};

FormattedToken.displayName = displayName;

export default injectIntl(FormattedToken);
