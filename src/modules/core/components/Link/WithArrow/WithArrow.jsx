/* @flow */
import type { Node } from 'react';

import React from 'react';

import type { Arrow } from '../types';

import styles from './WithArrow.module.css';

type Props = {|
  arrow?: Arrow,
  children: Node,
|};

const displayName = 'Link.WithArrow';

const WithArrow = ({ arrow, children }: Props) => {
  if (!arrow) return children;
  return <span className={styles[arrow]}>{children}</span>;
};

WithArrow.displayName = displayName;

export default WithArrow;
