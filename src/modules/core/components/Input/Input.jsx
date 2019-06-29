/* @flow */

import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';

import { getMainClasses } from '~utils/css';

import styles from './Input.module.css';

type Appearance = {|
  display?: 'none',
  padding?: 'small' | 'large' | 'huge',
  size?: 'large' | 'stretch',
|};

type Props = {
  /** Appearance object */
  appearance?: Appearance,
  /** Setting this will add className styles to the `appearance` object */
  className?: string,
  /** Outline in red if error */
  error?: ?string,
  /** Injected by `injectIntl` */
  intl: IntlShape,
  /** ID required to connect label and input */
  id: string,
  /** A string or a `messageDescriptor` that make up the input's label */
  label?: MessageDescriptor | string,
  /** Values for loading label (react-intl interpolation) */
  labelValues?: Object,
  /** A string or a `messageDescriptor` that make up the input's placeholder */
  placeholder?: MessageDescriptor | string,
  /** Values for loading placeholder (react-intl interpolation) */
  placeholderValues?: Object,
  /** Input html type attribute */
  type?: 'date' | 'number' | 'text',
};

const displayName = 'Input';

const Input = ({
  appearance,
  className,
  error,
  id,
  intl: { formatMessage },
  label,
  labelValues,
  placeholder,
  placeholderValues,
  type = 'text',
  ...rest
}: Props) => {
  const classNames = className
    ? `${getMainClasses(appearance, styles)} ${className}`
    : getMainClasses(appearance, styles);
  const labelText =
    typeof label === 'string'
      ? label
      : label && formatMessage(label, labelValues);
  const placeholderText =
    typeof placeholder === 'string'
      ? placeholder
      : placeholder && formatMessage(placeholder, placeholderValues);
  return (
    <label htmlFor={id} className={styles.label}>
      <span>{labelText}</span>
      <input
        id={id}
        className={classNames}
        placeholder={placeholderText}
        style={error ? { borderColor: '#F5416E' } : null}
        type={type}
        {...rest}
      />
    </label>
  );
};

Input.displayName = displayName;

export default injectIntl(Input);
