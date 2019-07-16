/* @flow */

import type { Node } from 'react';
import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Link from '~core/Link';

import styles from './GutterSection.module.css';

type LinkType = {|
  href: string,
  text: MessageDescriptor,
|};

type Props = {|
  children: Node,
  linkLeft?: LinkType,
  linkRight?: LinkType,
|};

type GutterProps = {|
  side: 'left' | 'right',
  ...LinkType,
|};

const GutterLink = ({ href, side, text }: GutterProps) => (
  <Link
    className={`${styles.gutterLink} ${
      side === 'left' ? styles.left : styles.right
    }`}
    href={href}
  >
    <div className={styles.gutterLinkText}>
      <FormattedMessage {...text} />
    </div>
  </Link>
);

const displayName = 'parts.GutterSection';

const GutterSection = ({ children, linkLeft, linkRight }: Props) => (
  <div className={styles.main}>
    <div className={styles.gutter}>
      {linkLeft && <GutterLink side="left" {...linkLeft} />}
    </div>
    <div className={styles.content}>{children}</div>
    <div className={styles.gutter}>
      {linkRight && <GutterLink side="right" {...linkRight} />}
    </div>
  </div>
);

GutterSection.displayName = displayName;

export default GutterSection;
