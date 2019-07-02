/* @flow */

import type { IntlShape, MessageDescriptor } from 'react-intl';

import React, { useEffect, useState } from 'react';
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
  type?: 'date' | 'number' | 'range' | 'text',
  /** Max value - only used for `range` type */
  max?: number | string,
  /** Min value - only used for `range` type */
  min?: number | string,
  /** Value of the input */
  value: number | string,
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
  max,
  min,
  placeholder,
  placeholderValues,
  type = 'text',
  value,
  ...rest
}: Props) => {
  const [styleProps, setStyleProps] = useState({});

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

  const toNumber = (val: number | string): number => parseInt(val, 10);

  useEffect(() => {
    const newStyles = {};
    if (type === 'range' && min && max) {
      const percent = Math.ceil(
        ((toNumber(value) - toNumber(min)) / (toNumber(max) - toNumber(min))) *
          100,
      );
      newStyles.background = `-webkit-linear-gradient(left,
        ${styles.rangeFillColor} 0%,
        ${styles.rangeFillColor} ${percent}%,
        transparent ${percent}%)`;
    }
    if (error) {
      newStyles.borderColor = styles.errorBorderColor;
    }
    setStyleProps(newStyles);
  }, [type, error, value, min, max]);
  return (
    <label htmlFor={id} className={styles.label}>
      <span>{labelText}</span>
      <input
        id={id}
        className={classNames}
        max={max}
        min={min}
        placeholder={placeholderText}
        style={styleProps}
        type={type}
        value={value}
        {...rest}
      />
    </label>
  );
};

Input.displayName = displayName;

export default injectIntl(Input);
