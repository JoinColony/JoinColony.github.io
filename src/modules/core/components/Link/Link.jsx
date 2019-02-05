/* @flow */
import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import type { OutProps } from './types';

const displayName = 'Link';

const Link = ({
  children,
  href,
  isInternal,
  getLinkPrefix,
  ...props
}: OutProps) =>
  isInternal ? (
    <GatsbyLink to={href} {...props}>
      {children}
    </GatsbyLink>
  ) : (
    <a href={href} {...props}>
      {children}
    </a>
  );

Link.displayName = displayName;

export default Link;
