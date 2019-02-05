/* @flow */
import type { HOC } from 'recompose';

import { compose, withProps } from 'recompose';

import type { InProps } from './types';

import Link from './Link.jsx';

const enhance: HOC<*, InProps> = compose(
  withProps(({ href, getLinkPrefix }) => {
    /*
     * A url is only considered to be "internal" if it starts with one slash.
     */
    const isInternal = /^\/(?!\/)/.test(href);
    /*
     * On-page anchors are considered "external" by Gatsby.
     */
    const isOnPageAnchor = /^#(?!\/)/.test(href);

    let url = href;
    if (isInternal && getLinkPrefix) {
      url = `/${getLinkPrefix(url)}${url}`;
    }

    return {
      href: url,
      isInternal,
      target: !isOnPageAnchor ? '_blank' : undefined,
      rel: !isOnPageAnchor ? 'noopener noreferrer' : undefined,
    };
  }),
);

export default enhance(Link);
