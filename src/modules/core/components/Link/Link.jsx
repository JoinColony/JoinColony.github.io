/* @flow */
import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import type { OutProps } from './types';

import WithArrow from './WithArrow';

const displayName = 'Link';

const Link = ({
  arrow,
  children,
  href,
  intl: { formatMessage },
  isInternal,
  persistLocale,
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
      <WithArrow arrow={arrow}>{linkContent}</WithArrow>
    </GatsbyLink>
  ) : (
    <a href={href} {...props}>
      <WithArrow arrow={arrow}>{linkContent}</WithArrow>
    </a>
  );
};

Link.displayName = displayName;

export default Link;
