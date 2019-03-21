/* @flow */
import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';

import styles from './CoreProductsItem.module.css';

const MSG = defineMessages({
  docsLinkText: {
    id: 'pages.Developers.CoreProductsItem.docsLinkText',
    defaultMessage: 'Docs',
  },
});

type Props = {|
  contentText: MessageDescriptor | string,
  titleText: string,
  docsUrl: string,
  githubUrl: string,
|};

const displayName = 'pages.Developers.CoreProductsItem';

const CoreProductsItem = ({
  contentText,
  docsUrl,
  githubUrl,
  titleText,
}: Props) => (
  <>
    <div>
      {/* @TODO image here */}
      <Heading
        appearance={{ theme: 'invert', size: 'medium', weight: 'medium' }}
        text={titleText}
      />
      <p>
        {typeof contentText === 'string' ? (
          contentText
        ) : (
          <FormattedMessage {...contentText} />
        )}
      </p>
    </div>
    <p className={styles}>
      <Link
        className={styles.itemLink}
        href={docsUrl}
        text={MSG.docsLinkText}
      />
      <Link className={styles.itemLink} href={githubUrl}>
        GitHub <span className={styles.linkArrow}>&rarr;</span>
      </Link>
    </p>
  </>
);

CoreProductsItem.displayName = displayName;

export default CoreProductsItem;
