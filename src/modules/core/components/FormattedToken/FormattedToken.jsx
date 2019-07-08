/* @flow */

import type { IntlShape } from 'react-intl';
import type { BigNumber } from 'web3-utils';

import React from 'react';
import {
  defineMessages,
  FormattedMessage,
  FormattedNumber,
  injectIntl,
} from 'react-intl';

import { getMainClasses } from '~utils/css';

import SpinnerLoader from '~core/SpinnerLoader';

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

type Appearance = {|
  theme?: 'statistics',
|};

type Props = {|
  /** Appearance object */
  appearance?: Appearance,
  /** Token amount */
  amount?: BigNumber | number,
  /** Setting this will add className styles to the `appearance` object */
  className?: string,
  /** Token amount */
  decimals?: number,
  /** Injected by `injectIntl` */
  intl: IntlShape,
  /** Replace amount with loading indicator when loading */
  loading?: boolean,
  /** Maximum number of fraction digits */
  maximumFractionDigits?: number,
  /** Minimum number of fraction digits */
  minimumFractionDigits?: number,
  /** Token symbol */
  symbol: string,
|};

const displayName = 'FormattedToken';

// Formats the `amount` as a string in order to allow for a custom `decimals`
// value (default 18) and to display the resulting `amount` in decimals.
const getFormattedAmount = (amount, decimals) => {
  let formatted = amount.toString();
  if (amount < 0) {
    formatted = formatted.substring(1, formatted.length);
  }
  let zeros = formatted.length - (decimals || 18);
  if (zeros < 0) {
    zeros = Math.abs(zeros);
    while (zeros > 0) {
      formatted = `0${formatted}`;
      zeros -= 1;
    }
    formatted = `0.${formatted}`;
  } else {
    formatted = formatted.split('');
    formatted.splice(zeros, 0, '.');
    formatted = formatted.join('');
  }
  if (amount < 0) {
    formatted = `-${formatted}`;
  }
  return formatted;
};

const FormattedToken = ({
  amount = 0,
  appearance,
  className,
  decimals,
  loading,
  maximumFractionDigits,
  minimumFractionDigits,
  symbol,
}: Props) => {
  const classNames = className
    ? `${getMainClasses(appearance, styles)} ${className}`
    : getMainClasses(appearance, styles);
  const tokenFormat = {
    id: symbol,
    maximumFractionDigits: maximumFractionDigits || 4,
    minimumFractionDigits: minimumFractionDigits || 0,
  };
  return (
    <div className={classNames}>
      {loading ? (
        <SpinnerLoader appearance={{ theme: 'primary' }} />
      ) : (
        <FormattedMessage
          {...MSG.amount}
          values={{
            amount: (
              <FormattedNumber
                {...tokenFormat}
                value={getFormattedAmount(amount, decimals)}
              />
            ),
          }}
        />
      )}
      <FormattedMessage {...MSG.symbol} values={{ symbol }} />
    </div>
  );
};

FormattedToken.displayName = displayName;

export default injectIntl(FormattedToken);
