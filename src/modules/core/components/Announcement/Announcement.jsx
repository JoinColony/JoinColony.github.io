/* @flow */

import type { Node } from 'react';
import type { IntlShape, MessageDescriptor } from 'react-intl';

import React, { useMemo } from 'react';
import { injectIntl } from 'react-intl';

import { getMainClasses } from '~utils/css';

import styles from './Announcement.module.css';

type Appearance = {|
  theme?: 'dark' | 'grey',
|};

type Props = {
  appearance?: Appearance,
  children?: Node,
  intl: IntlShape,
  text?: MessageDescriptor | string,
  textValues?: Object,
};

const displayName = 'Announcement';

const Announcement = ({
  appearance,
  children,
  intl: { formatMessage },
  text,
  textValues,
  ...rest
}: Props) => {
  const textValue = useMemo(() => {
    if (children) {
      return children;
    }
    if (!text) {
      return '';
    }
    return typeof text === 'string' ? text : formatMessage(text, textValues);
  }, [children, formatMessage, text, textValues]);
  return (
    <p className={getMainClasses(appearance, styles)} {...rest}>
      <span className={styles.prefixUnderline} />
      {textValue}
    </p>
  );
};

Announcement.displayName = displayName;

export default injectIntl(Announcement);
