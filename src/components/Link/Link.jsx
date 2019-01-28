/* @flow */
import type { Node } from 'react';

import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

function isExternal(url) {
  if ((url && url.startsWith('http')) || url.startsWith('mailto')) {
    return true;
  }
  return false;
}

type Props = {
  children: Node,
  href: string,
};

const Link = ({ children, href, ...props }: Props) =>
  isExternal(href) ? (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <GatsbyLink to={href} {...props}>
      {children}
    </GatsbyLink>
  );

export default Link;
