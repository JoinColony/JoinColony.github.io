/* @flow */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import copy from 'copy-to-clipboard';

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

type Props = {|
  /** The text that will be copied */
  copyTarget: string,
|};

const displayName = 'Copy';

const Copy = ({ copyTarget }: Props) => {
  const [copied, setCopied] = useState(false);
  const copiedTimeout = useRef(null);

  const handleCopy = useCallback(() => {
    copy(copyTarget);
    setCopied(true);
    copiedTimeout.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copyTarget]);

  useEffect(() => {
    return () => {
      if (copied) clearTimeout(copiedTimeout.current);
    };
  }, [copied]);

  if (copied) {
    return (
      <div className={styles.main}>
        <Button appearance={{ theme: 'reset' }} disabled type="submit">
          <Image className={styles.copy} alt={MSG.copy} src="/img/copied.svg" />
        </Button>
        <FormattedMessage {...MSG.copied} />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Button
        appearance={{ theme: 'reset' }}
        onClick={handleCopy}
        type="submit"
      >
        <Image className={styles.copy} alt={MSG.copy} src="/img/copy.svg" />
      </Button>
    </div>
  );
};

Copy.displayName = displayName;

export default Copy;
