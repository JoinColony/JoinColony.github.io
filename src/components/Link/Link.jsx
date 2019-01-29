/* @flow */
import type { Node } from 'react';

import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

type ExtraUrlProps = {|
  target?: '_blank',
  rel?: 'noopener noreferrer',
|};

type Props = {
  children: Node,
  href: string,
};

/*
 * A url is only considered to be "internal" if it starts with one slash.
 */
const isInternal = (url: string): boolean => /^\/(?!\/)/.test(url);

/*
 * On-page anchors are considered "external" by Gatsby.
 */
const isOnPageAnchor = (url: string): boolean => /^#(?!\/)/.test(url);

/*
 * If the anchor is an on-page-anchor (i.e. #get-started),
 * gatsby warns not to use the `Link` component, as it
 * refers to these as tehcnically being external links.
 */
const getUrlProps = (url: string): ExtraUrlProps | void => {
  if (!isOnPageAnchor(url))
    return {
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  return undefined;
};

const Link = ({ children, href, ...props }: Props) =>
  isInternal(href) ? (
    <GatsbyLink to={href} {...props}>
      {children}
    </GatsbyLink>
  ) : (
    <a {...props} href={href} {...getUrlProps(href)}>
      {children}
    </a>
  );

export default Link;
