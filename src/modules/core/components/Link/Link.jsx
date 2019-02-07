/* @flow */
import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import type { OutProps } from './types';

const displayName = 'Link';

const Link = ({
  children,
  href,
  intl: { formatMessage },
  isInternal,
  text,
  textValues,
  transformUrl,
  ...props
}: OutProps) => {
  const linkText =
    typeof text === 'string' ? text : text && formatMessage(text, textValues);
  const linkContent = linkText || children || null;
  return isInternal ? (
    <GatsbyLink to={href} {...props}>
      {linkContent}
    </GatsbyLink>
  ) : (
    <a href={href} {...props}>
      {linkContent}
    </a>
  );
};

Link.displayName = displayName;

export default Link;
