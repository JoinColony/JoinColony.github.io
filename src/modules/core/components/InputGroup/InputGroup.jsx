/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React, { useCallback, useState } from 'react';

import Button from '~core/Button';
import Input from '~core/Input';

import styles from './InputGroup.module.css';

type Props = {|
  buttonText: MessageDescriptor | string,
  buttonTextValues?: Object,
  id: string,
  onSubmit: (value: string) => void,
  placeholder: MessageDescriptor | string,
  placeholderValues?: Object,
|};

const displayName = 'InputGroup';

const InputGroup = ({
  buttonText,
  buttonTextValues,
  id,
  onSubmit: callback,
  placeholder,
  placeholderValues,
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
    <form className={styles.main} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            id={id}
            onChange={handleChange}
            placeholder={placeholder}
            placeholderValues={placeholderValues}
            value={value}
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
  );
};

InputGroup.displayName = displayName;

export default InputGroup;
