/* @flow */
import type { Node } from 'react';

export type InProps = {
  children: Node,
  href: string,
  getLinkPrefix?: (href: string) => string,
};

export type OutProps = InProps & {
  isInternal: boolean,
  target?: '_blank',
  rel?: 'noopener noreferrer',
};
