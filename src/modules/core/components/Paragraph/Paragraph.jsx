/* @flow */

import type { Node } from 'react';
import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { getMainClasses } from '~utils/css';

import styles from './Paragraph.module.css';

type Appearance = {|
  theme?: 'invert' | 'grey' | 'lightBlue' | 'danger',
  margin?: 'none',
  size?: 'extraSmall' | 'small' | 'normal' | 'medium' | 'large',
|};

type Props = {|
  /** Appearance object */
  appearance?: Appearance,
  /** Will be used over `text` if provided */
  children?: Node,
  /** Text to display. May contain `{br}` for linebreaks if `MessageDescriptor`. */
  text?: MessageDescriptor | string,
  /** Text values for intl-interpolaction. Will be merged with `br` value */
  textValues?: Object,
|};

const displayName = 'Paragraph';

const Paragraph = ({
  appearance,
  children,
  text,
  textValues: textValuesProp = {},
}: Props) => {
  const defaultValues = { br: <br /> };
  const textValues = Object.keys(textValuesProp).length
    ? { ...defaultValues, ...textValuesProp }
    : defaultValues;
  return (
    <p className={`${getMainClasses(appearance, styles)} ${styles.paragraph}`}>
      {children ? (
        <>{children}</>
      ) : (
        <>
          {text && (
            <>
              {typeof text === 'string' ? (
                <>{text}</>
              ) : (
                <FormattedMessage {...text} values={textValues} />
              )}
            </>
          )}
        </>
      )}
    </p>
  );
};

Paragraph.displayName = displayName;

export default Paragraph;
