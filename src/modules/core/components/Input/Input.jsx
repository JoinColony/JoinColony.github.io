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
  /** Overwriting class name(s). Setting this will overwrite the `appearance` object */
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
  type = 'text',
  ...rest
}: Props) => {
  const classNames = className || getMainClasses(appearance, styles);
  const labelText =
    typeof label === 'string'
      ? label
      : label && formatMessage(label, labelValues);
  return (
    <label htmlFor={id} className={styles.label}>
      <span>{labelText}</span>
      <input
        id={id}
        className={classNames}
        style={error ? { borderColor: '#F5416E' } : null}
        type={type}
        {...rest}
      />
    </label>
  );
};

Input.displayName = displayName;

export default injectIntl(Input);
