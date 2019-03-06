/* @flow */
import { injectIntl } from 'react-intl';
import { compose, withProps } from 'recompose';

import type { AltLocalePagePath } from '~types';

import { withFileContext } from '~hoc/files';
import { withLocation } from '~hoc/location';
import { withAllPagePaths } from '~hoc/pages';
import { getAltLocalePages } from '~utils/i18n';

import SEO from './SEO.jsx';

const enhance = compose(
  injectIntl,
  withFileContext(),
  withLocation(),
  withAllPagePaths(),
  withProps(
    ({
      allSitePagePaths,
      alternatePagePaths,
      intl: { locale },
      location: { pathname: preNormalizedPathname },
    }): { alternatePagePaths: Array<AltLocalePagePath> } => ({
      alternatePagePaths:
        alternatePagePaths ||
        getAltLocalePages(preNormalizedPathname, allSitePagePaths, locale),
    }),
  ),
);

export default enhance(SEO);
