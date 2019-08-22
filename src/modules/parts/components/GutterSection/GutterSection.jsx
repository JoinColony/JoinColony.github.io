/* @flow */

import type { Node } from 'react';
import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Link from '~core/Link';
import { getMainClasses } from '~utils/css';

import styles from './GutterSection.module.css';

type Appearance = {|
  theme?: 'pink',
  oneSide?: 'left' | 'right',
  // Specify theme for only one side
  themeLeft?: 'dark',
  themeRight?: 'dark',
|};

type LinkType = {|
  href: string,
  text: MessageDescriptor,
|};

type Props = {
  appearance?: Appearance,
  children: Node,
  linkLeft?: LinkType,
  linkRight?: LinkType,
};

type GutterLinkProps = {|
  side: 'left' | 'right',
  ...LinkType,
|};

const GutterLink = ({ href, side, text }: GutterLinkProps) => (
  <Link
    className={`${styles.gutterLink} ${
      side === 'left' ? styles.leftLink : styles.rightLink
    }`}
    href={href}
  >
    <div className={styles.gutterLinkText}>
      <FormattedMessage {...text} />
    </div>
  </Link>
);

const displayName = 'parts.GutterSection';

const GutterSection = ({
  appearance,
  children,
  linkLeft,
  linkRight,
  ...rest
}: Props) => (
  <div
    className={getMainClasses(appearance, styles, {
      hasLeftLink: !!linkLeft,
      hasRightLink: !!linkRight,
    })}
    {...rest}
  >
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
