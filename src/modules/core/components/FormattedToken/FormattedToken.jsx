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

  // In order to allow for a custum `decimals` value and to ensure the result
  // can be displayed in decimals, we are formatting the `amount` as a string.
  let formattedAmount = amount.toString();
  if (!formattedAmount.includes('-')) {
    const zeros = formattedAmount.length - (decimals || 18);
    if (zeros < 0) {
      let count = Math.abs(zeros);
      while (count > 0) {
        formattedAmount = `0${formattedAmount}`;
        count -= 1;
      }
      formattedAmount = `0.${formattedAmount}`;
    } else {
      formattedAmount = formattedAmount.split('');
      formattedAmount.splice(zeros, 0, '.');
      formattedAmount = formattedAmount.join('');
    }
  } else {
    formattedAmount = '0';
  }

  return (
    <div className={classNames}>
      {loading ? (
        <SpinnerLoader appearance={{ theme: 'primary' }} />
      ) : (
        <FormattedMessage
          {...MSG.amount}
          values={{
            amount: (
              <FormattedNumber {...tokenFormat} value={formattedAmount} />
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
