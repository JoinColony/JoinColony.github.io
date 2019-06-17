/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import Heading from '~core/Heading';

import styles from './CtaItem.module.css';

type Props = {|
  contentText: MessageDescriptor | string,
  headingText: MessageDescriptor | string,
  linkText: MessageDescriptor | string,
  linkUrl: string,
|};

const displayName = 'parts.DevRelCta.CtaItem';

const CtaItem = ({ contentText, headingText, linkText, linkUrl }: Props) => (
  <div className={styles.main}>
    <div className={styles.contentContainer}>
      <Heading
        appearance={{
          margin: 'large',
          size: 'mediumLarge',
          theme: 'dark',
          weight: 'medium',
        }}
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
    <div className={styles.linkContainer}>
      <Button
        appearance={{ padding: 'small', theme: 'primaryHollow' }}
        linkTo={linkUrl}
        style={{ fontSize: styles.buttonTextSize }}
        text={linkText}
      />
    </div>
  </div>
);

CtaItem.displayName = displayName;

export default CtaItem;
