/* @flow */

import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';
import { getMainClasses } from '~utils/css';

import styles from './Textarea.module.css';

type Props = {
  error?: string | MessageDescriptor,
  id: string,
  /** Injected by `injectIntl` */
  intl: IntlShape,
  label: string | MessageDescriptor,
  labelValues?: Object,
  name: string,
  showErrorText?: boolean,
  value: string,
};

const displayName = 'Textarea';

const Textarea = ({
  error,
  id,
  intl: { formatMessage },
  label,
  labelValues,
  name,
  showErrorText,
  value,
  ...rest
}: Props) => {
  const labelText =
    typeof label === 'string' ? label : formatMessage(label, labelValues);
  const errorText =
    typeof error === 'string' ? error : error && formatMessage(error);
  return (
    <label className={styles.label} htmlFor={id}>
      <span>{labelText}</span>
      <textarea
        className={getMainClasses({}, styles, { hasError: !!error })}
        id={id}
        name={name}
        value={value}
        {...rest}
      />
      {showErrorText && (
        // Always render this div so the UI doesn't shift once an error message exists
        <div className={styles.errorMessage}>
          {errorText && <small>{errorText}</small>}
        </div>
      )}
    </label>
  );
};

Textarea.displayName = displayName;

export default injectIntl(Textarea);
