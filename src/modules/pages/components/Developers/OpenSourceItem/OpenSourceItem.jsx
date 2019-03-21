/* @flow */
import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';

import styles from './OpenSourceItem.module.css';

const MSG = defineMessages({
  docsLinkText: {
    id: 'pages.Developers.OpenSourceItem.docsLinkText',
    defaultMessage: 'Docs',
  },
});

type Props = {|
  docsUrl: string,
  githubUrl: string,
  headingText: string,
  textContent: MessageDescriptor | string,
|};

const displayName = 'pages.Developers.OpenSourceItem';

const OpenSourceItem = ({
  docsUrl,
  githubUrl,
  headingText,
  textContent,
}: Props) => (
  <>
    <div className={styles.imageContainer}>{/* @TODO add image */}</div>
    <div className={styles.contentContainer}>
      <Heading
        appearance={{ size: 'medium', theme: 'invert', weight: 'medium' }}
        text={headingText}
      />
      <p>
        {typeof textContent === 'string' ? (
          textContent
        ) : (
          <FormattedMessage {...textContent} />
        )}
      </p>
      <p>
        <Link
          className={styles.itemLink}
          href={docsUrl}
          text={MSG.docsLinkText}
        />
        <Link className={styles.itemLink} href={githubUrl}>
          GitHub <span className={styles.linkArrow}>&rarr;</span>
        </Link>
      </p>
    </div>
  </>
);

OpenSourceItem.displayName = displayName;

export default OpenSourceItem;
