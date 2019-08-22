/* @flow */

import type { IntlShape, MessageDescriptor, MessageValues } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';

import { getMainClasses } from '~utils/css';

import styles from './Badge.module.css';

type Appearance = {|
  theme?: 'primary' | 'secondary',
|};

type Props = {|
  appearance?: Appearance,
  intl: IntlShape,
  text: MessageDescriptor | string,
  textValues?: MessageValues,
|};

const displayName = 'Badge';

const Badge = ({
  appearance,
  intl: { formatMessage },
  text,
  textValues,
}: Props) => {
  const textContent =
    typeof text === 'string' ? text : formatMessage(text, textValues);
  return (
    <span className={getMainClasses(appearance, styles)}>{textContent}</span>
  );
};

Badge.displayName = displayName;

export default injectIntl(Badge);
