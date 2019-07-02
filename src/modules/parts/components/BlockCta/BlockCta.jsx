/* @flow */

import type { Node } from 'react';

import React from 'react';

import styles from './BlockCta.module.css';

const displayName = 'parts.BlockCta';

type Props = {|
  leftBlockChildren: Node,
  rightBlockChildren: Node,
|};

const BlockCta = ({ leftBlockChildren, rightBlockChildren }: Props) => (
  <div className={styles.main}>
    <div className={styles.leftBlock}>
      <div className={styles.leftBlockAlignment}>{leftBlockChildren}</div>
    </div>
    <div className={styles.rightBlock}>
      <div className={styles.rightBlockAlignment}>{rightBlockChildren}</div>
    </div>
  </div>
);

BlockCta.displayName = displayName;

export default BlockCta;
