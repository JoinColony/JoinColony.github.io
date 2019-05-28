/* @flow */

import React, { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import copy from 'copy-to-clipboard';

import { getMainClasses } from '~utils/css';

import Button from '~core/Button';
import Image from '~core/Image';

import styles from './Copy.module.css';

const MSG = defineMessages({
  copy: {
    id: 'pages.Dashboard.Account.Address.copy',
    defaultMessage: 'Copy',
  },
  copied: {
    id: 'pages.Dashboard.Account.Address.copied',
    defaultMessage: 'Copied',
  },
});

type Appearance = {
  theme?: 'primary',
};

type Props = {
  /** Appearance object */
  appearance?: Appearance,
  /** Overwriting class name(s). Setting this will overwrite the `appearance` object */
  className?: string,
  /** The text that will be copied */
  copyTarget: string,
};

const displayName = 'Copy';

const Copy = ({
  appearance = { theme: 'primary' },
  className,
  copyTarget,
  ...rest
}: Props) => {
  const [copied, setCopied] = useState(false);
  const handleCopyAddress = useCallback(() => {
    copy(copyTarget);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copyTarget]);
  const classNames = className || getMainClasses(appearance, styles);
  if (copied) {
    return (
      <div className={styles.copied} {...rest}>
        <Button
          appearance={{ theme: 'reset' }}
          className={classNames}
          disabled
          type="submit"
          {...rest}
        >
          <Image className={styles.copy} alt={MSG.copy} src="/img/copied.svg" />
          <FormattedMessage {...MSG.copied} />
        </Button>
      </div>
    );
  }
  return (
    <Button
      appearance={{ theme: 'reset' }}
      className={classNames}
      onClick={handleCopyAddress}
      type="submit"
      {...rest}
    >
      <Image className={styles.copy} alt={MSG.copy} src="/img/copy.svg" />
    </Button>
  );
};

Copy.displayName = displayName;

export default Copy;
