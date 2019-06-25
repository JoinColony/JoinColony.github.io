/* @flow */

import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

import { getMainClasses } from '~utils/css';

import styles from './ErrorMessage.module.css';

const MSG = defineMessages({
  defaultError: {
    id: 'core.ErrorMessage.defaultError',
    defaultMessage: 'An error occured',
  },
});

type Appearance = {|
  color?: 'pink',
|};

type Props = {|
  /** Appearance object */
  appearance?: Appearance,
  /** Setting this will add className styles to the `appearance` object */
  className?: string,
  /** Error message */
  error: Error | MessageDescriptor | string,
  /** Injected by `injectIntl` */
  intl: IntlShape,
|};

const displayName = 'ErrorMessage';

const ErrorMessage = ({ appearance, className, error, ...rest }: Props) => {
  const classNames = className
    ? `${getMainClasses(appearance, styles)} ${className}`
    : getMainClasses(appearance, styles);
  const printMessage = () => {
    if (error instanceof Error) {
      return error.toString();
    }
    if (typeof error === 'object') {
      return <FormattedMessage {...error} />;
    }
    if (typeof error === 'string') {
      return error;
    }
    return <FormattedMessage {...MSG.defaultError} />;
  };
  return (
    <div className={classNames} {...rest}>
      <div className={styles.errorDot} />
      <div>{printMessage()}</div>
    </div>
  );
};

ErrorMessage.displayName = displayName;

export default injectIntl(ErrorMessage);
