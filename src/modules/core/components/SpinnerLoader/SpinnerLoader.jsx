/* @flow */

import React from 'react';
import { injectIntl } from 'react-intl';

import { getMainClasses } from '~utils/css';

import type { IntlShape, MessageDescriptor, MessageValues } from 'react-intl';

import styles from './SpinnerLoader.module.css';

type Appearance = {|
  size?: 'small' | 'medium' | 'large' | 'huge' | 'massive',
  theme?: 'primary',
|};

type Props = {|
  /** Appearance object */
  appearance?: Appearance,
  /** Setting this will add className styles to the `appearance` object */
  className?: string,
  /** Text to display while loading */
  loadingText?: MessageDescriptor | string,
  /** Values for loading text (react-intl interpolation) */
  textValues?: MessageValues,
  /** Injected by `injectIntl` */
  intl: IntlShape,
|};

const SpinnerLoader = ({
  appearance = { size: 'small' },
  className,
  intl: { formatMessage },
  loadingText,
  textValues,
}: Props) => {
  const classNames = className
    ? `${getMainClasses(appearance, styles)} ${className}`
    : getMainClasses(appearance, styles);
  return (
    <div className={classNames}>
      <div className={styles.loader} />
      {loadingText && (
        <div className={styles.loadingTextContainer}>
          <div className={styles.loadingTextContainerInner}>
            {typeof loadingText === 'string'
              ? loadingText
              : formatMessage(loadingText, textValues)}
          </div>
        </div>
      )}
    </div>
  );
};

export default injectIntl(SpinnerLoader);
