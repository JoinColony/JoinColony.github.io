/* @flow */
import type { HOC } from 'recompose';

import { compose, withProps } from 'recompose';
import { injectIntl } from 'react-intl';

import type { InProps } from './types';

import Link from './Link.jsx';

const enhance: HOC<*, InProps> = compose(
  withProps(({ href: url, transformUrl }) => {
    /*
     * A url is only considered to be "internal" if it starts with one slash.
     */
    const isInternal = /^\/(?!\/)/.test(url);
    /*
     * On-page anchors are considered "external" by Gatsby.
     */
    const isOnPageAnchor = /^#(?!\/)/.test(url);

    const href =
      isInternal && typeof transformUrl === 'function'
        ? transformUrl(url)
        : url;

    return {
      href,
      isInternal,
      rel: !isOnPageAnchor ? 'noopener noreferrer' : undefined,
      target: !isOnPageAnchor ? '_blank' : undefined,
    };
  }),
  injectIntl,
);

export default enhance(Link);
