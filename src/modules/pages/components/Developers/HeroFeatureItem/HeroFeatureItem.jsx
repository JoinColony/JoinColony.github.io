/* @flow */
import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';

import styles from './HeroFeatureItem.module.css';

type Props = {|
  contentText: MessageDescriptor,
  headingText: MessageDescriptor,
  linkText: MessageDescriptor | string,
  linkUrl: string,
|};

const displayName = 'pages.Developers.HeroFeatureItem';

const HeroFeatureItem = ({
  contentText,
  headingText,
  linkText,
  linkUrl,
}: Props) => (
  <>
    <div>
      <Heading
        appearance={{ size: 'medium', theme: 'invert', weight: 'medium' }}
        text={headingText}
      />
      <p className={styles.heroFeatureText}>
        <FormattedMessage {...contentText} />
      </p>
    </div>
    <div>
      <Link
        arrow="right"
        className={styles.heroFeatureLink}
        href={linkUrl}
        text={linkText}
      />
    </div>
  </>
);

HeroFeatureItem.displayName = displayName;

export default HeroFeatureItem;
