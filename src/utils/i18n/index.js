/* @flow */
import type { AltLocalePagePath } from '~types';
import { withPrefix } from 'gatsby';

import { langConfig } from '~i18nConfig';
import { normalizePathname } from '~utils/strings';

const { defaultLangKey, langs, prefixDefaultLangKey } = langConfig;

export const getAltLocales = (
  currentLocale: string,
  configuredLocales?: Array<string> = langs,
): Array<string> => {
  return configuredLocales.filter(lang => lang !== currentLocale);
};

export const getAltLocalePages = (
  preNormalizedPathname: string,
  allSitePagePaths: Array<string>,
  locale: string,
): Array<AltLocalePagePath> => {
  // Normalize the pathname to *always* end in a slash for comparison sake
  const pathname: string = normalizePathname(preNormalizedPathname);

  // Get configured locales, excluding current locale
  const otherLocales: Array<string> = getAltLocales(locale);

  // Locale prefix on the url - we want to remove this for when we check to make sure the page exists
  const currentPathnameLocalePrefix: string =
    locale === defaultLangKey && !prefixDefaultLangKey ? '' : `/${locale}`;

  // Get the pathname without the locale
  const pathnameSansLocale: string = currentPathnameLocalePrefix
    ? pathname.replace(currentPathnameLocalePrefix, '')
    : pathname;

  // Create possible locale variations of the page path so we can see if they exist
  const potentialAltVersions: Array<AltLocalePagePath> = otherLocales.map(
    configuredLocale => {
      let localePrefix = `/${configuredLocale}`;
      if (configuredLocale === defaultLangKey && !prefixDefaultLangKey) {
        localePrefix = '';
      }
      return {
        locale: configuredLocale,
        pagePath: withPrefix(`${localePrefix}${pathnameSansLocale}`),
      };
    },
  );

  // Now find the page paths that actually exist.
  const existingAltPagePaths = potentialAltVersions.filter(({ pagePath }) =>
    allSitePagePaths.includes(pagePath),
  );

  return existingAltPagePaths;
};
