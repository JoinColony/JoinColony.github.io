/* @flow */

import type { Node } from 'react';

import React from 'react';

import { getMainClasses } from '~utils/css';

import styles from './BlockCta.module.css';

const displayName = 'parts.BlockCta';

type Appearance = {|
  firstSideMobile?: 'left' | 'right',
|};

type Props = {|
  appearance?: Appearance,
  leftBlockChildren: Node,
  rightBlockChildren: Node,
|};

const BlockCta = ({
  appearance = { firstSideMobile: 'left' },
  leftBlockChildren,
  rightBlockChildren,
}: Props) => (
  <div className={getMainClasses(appearance, styles)}>
    <div className={styles.leftBlock}>{leftBlockChildren}</div>
    <div className={styles.rightBlock}>{rightBlockChildren}</div>
  </div>
);

BlockCta.displayName = displayName;

export default BlockCta;
