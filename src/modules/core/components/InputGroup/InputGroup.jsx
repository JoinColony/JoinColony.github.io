/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React, { useCallback, useState } from 'react';

import Button from '~core/Button';
import Input from '~core/Input';
import { getMainClasses } from '~utils/css';

import styles from './InputGroup.module.css';

type Appearance = {|
  theme?: 'dark' | 'light',
|};

type Props = {|
  appearance?: Appearance,
  buttonText: MessageDescriptor | string,
  buttonTextValues?: Object,
  id: string,
  onSubmit: (value: string) => void,
  placeholder: MessageDescriptor | string,
  placeholderValues?: Object,
  type?: 'email' | 'number' | 'text',
|};

const displayName = 'InputGroup';

const InputGroup = ({
  appearance,
  buttonText,
  buttonTextValues,
  id,
  onSubmit: callback,
  placeholder,
  placeholderValues,
  type = 'text',
}: Props) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (event: SyntheticInputEvent<HTMLInputElement>) =>
      setValue(event.currentTarget.value),
    [],
  );

  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      callback(value);
      setValue('');
    },
    [callback, value],
  );

  return (
    <div className={styles.wrapper}>
      <form
        className={getMainClasses(appearance, styles)}
        onSubmit={handleSubmit}
      >
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <Input
              className={styles.input}
              id={id}
              onChange={handleChange}
              placeholder={placeholder}
              placeholderValues={placeholderValues}
              type={type}
              value={value}
              required
            />
          </div>
          <div>
            <Button
              appearance={{ borderRadius: 'none', theme: 'primary' }}
              className={styles.button}
              text={buttonText}
              textValues={buttonTextValues}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

InputGroup.displayName = displayName;

export default InputGroup;
