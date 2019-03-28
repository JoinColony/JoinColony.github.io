/* @flow */
import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';

import styles from './CtaItem.module.css';

type Props = {|
  contentText: MessageDescriptor | string,
  headingText: MessageDescriptor | string,
  linkText: MessageDescriptor | string,
  linkUrl: string,
|};

const displayName = 'templates.DocPage.CtaItem';

const CtaItem = ({ contentText, headingText, linkText, linkUrl }: Props) => (
  <div className={styles.main}>
    <div className={styles.contentContainer}>
      <Heading
        appearance={{ size: 'medium', theme: 'primary', weight: 'medium' }}
        text={headingText}
      />
      <p className={styles.contentText}>
        {typeof contentText === 'string' ? (
          contentText
        ) : (
          <FormattedMessage {...contentText} />
        )}
      </p>
    </div>
    <div>
      <Link className={styles.link} text={linkText} href={linkUrl} />
    </div>
  </div>
);

CtaItem.displayName = displayName;

export default CtaItem;
