/* @flow */

import type { HOC } from 'recompose';

import { compose, defaultProps, withProps } from 'recompose';
import { injectIntl } from 'react-intl';

import { DEFAULT_LOCALE } from '~i18nConfig';

import type { InProps } from './types';

import Link from './Link.jsx';

const enhance: HOC<*, InProps> = compose(
  injectIntl,
  defaultProps({ persistLocale: true }),
  withProps(({ href: url, intl: { locale }, persistLocale, transformUrl }) => {
    /*
     * A url is only considered to be "internal" if it starts with one slash.
     */
    const isInternal = /^\/(?!\/)/.test(url);
    /*
     * On-page anchors are considered "external" by Gatsby.
     */
    const isOnPageAnchor = /^#(?!\/)/.test(url);

    let href: string =
      isInternal && typeof transformUrl === 'function'
        ? transformUrl(url)
        : url;

    const shouldPersistLocale: boolean =
      isInternal && locale && locale !== DEFAULT_LOCALE;

    if (persistLocale && shouldPersistLocale) {
      href = `/${locale}${href}`;
    }

    return {
      href,
      isInternal,
      rel: !isOnPageAnchor ? 'noopener noreferrer' : undefined,
      target: !isOnPageAnchor ? '_blank' : undefined,
    };
  }),
);

export default enhance(Link);
