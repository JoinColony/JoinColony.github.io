/* @flow */

import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { getMainClasses } from '~utils/css';

import styles from './ErrorMessage.module.css';

type Appearance = {|
  color?: 'pink',
|};

type Props = {|
  /** Appearance object */
  appearance?: Appearance,
  /** Overwriting class name(s). Setting this will overwrite the `appearance` object */
  className?: string,
  /** Error message */
  error: MessageDescriptor | string,
  /** Injected by `injectIntl` */
  intl: IntlShape,
|};

const displayName = 'ErrorMessage';

const ErrorMessage = ({ appearance, className, error, ...rest }: Props) => {
  const classNames = className || getMainClasses(appearance, styles);
  return (
    <div className={classNames} {...rest}>
      <div className={styles.errorDot} />
      <div>
        {typeof error === 'string' ? error : <FormattedMessage {...error} />}
      </div>
    </div>
  );
};

ErrorMessage.displayName = displayName;

export default injectIntl(ErrorMessage);
