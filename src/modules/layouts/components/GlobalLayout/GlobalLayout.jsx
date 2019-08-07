/* @flow */

import type { Node } from 'react';
import type { RouteProps } from '@reach/router';
import type { $npm$ReactIntl$LocaleData } from 'react-intl';

import React from 'react';
import Helmet from 'react-helmet';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import { graphql, useStaticQuery, withPrefix } from 'gatsby';

import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css';
import '../../../../styles/variables.css';

import FileContext from '~context/FileContext';
import { CONFIGURED_LOCALES, DEFAULT_LOCALE } from '~i18nConfig';
import enMessages from '~i18n/en.json';

import '~styles/normalize.css';
import '~styles/fonts.css';
import '~styles/syntax-hightlight.css';

type LocaleMessage = { [key: string]: string };

type LocaleConfig = {|
  messages: LocaleMessage,
  data: $npm$ReactIntl$LocaleData,
|};

type LocaleConfigs = {
  [locale: string]: LocaleConfig,
};

export type GlobalLayoutProps = {
  children: Node,
};

type Props = RouteProps & GlobalLayoutProps;

const localeMessages: LocaleConfigs = {
  en: {
    messages: enMessages,
    data: enLocaleData,
  },
};

const configuredLocalesData: Array<$npm$ReactIntl$LocaleData> = Object.keys(
  localeMessages,
).reduce(
  (accumulator, configKey) => [
    ...accumulator,
    ...localeMessages[configKey].data,
  ],
  [],
);

addLocaleData(configuredLocalesData);

const getMessagesForLocale = (locale: string): LocaleMessage =>
  localeMessages[locale].messages || localeMessages[DEFAULT_LOCALE].messages;

const getLocaleString = (locale?: string): string =>
  !!locale && !!localeMessages[locale] ? locale : DEFAULT_LOCALE;

const getFileMapping = (files): Object => {
  return files.reduce(
    (current, next) => ({
      ...current,
      [`${next.node.sourceInstanceName}/${next.node.relativePath}`]: next.node
        .publicURL,
    }),
    {},
  );
};

/*
 * Check that the configured locales in `~i18nConfig` match the locale messages
 * configured here with the `IntlProvider`. If locales aren't configured, accessing
 * those locales on gatsby pages will yield a 404 (doc pages will likely work partially).
 *
 * This will merely `warn` to the console of the issue, as this shouldn't be a breaking
 * error.
 */
const checkLocaleConfig = (): void => {
  const configuredMessageLocales: Array<string> = Object.keys(localeMessages);
  const localesWithoutMessages: Array<string> = CONFIGURED_LOCALES.filter(
    locale => configuredMessageLocales.indexOf(locale) === -1,
  );
  if (localesWithoutMessages.length > 0) {
    const missingLocalesString: string = localesWithoutMessages.reduce(
      (accumulator, locale) => {
        let localesString = accumulator;
        localesString += accumulator.length > 0 ? `, ${locale}` : locale;
        return localesString;
      },
      '',
    );
    console.warn(
      'i18n messages have not been configured with' +
        ' the IntlProvider for the following locales:',
      missingLocalesString,
      '\n\nAs a result, translated content & links may be inconsistent' +
        ' across the site. To supress this warning, add locale messages' +
        ' for the above locales in the `GlobalLayout` component.',
    );
  }
};

checkLocaleConfig();

const displayName = 'layouts.GlobalLayout';

const GlobalLayout = ({ children, location }: Props) => {
  const potentialLocale = location && location.pathname.split('/')[1];
  const locale = getLocaleString(potentialLocale);
  const messages: LocaleMessage = getMessagesForLocale(locale);
  const data = useStaticQuery(graphql`
    query {
      files: allFile {
        edges {
          node {
            sourceInstanceName
            relativePath
            publicURL
          }
        }
      }
    }
  `);
  const trackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID || '';
  return (
    <>
      <Helmet>
        <link
          rel="shortcut icon"
          type="image/png"
          href={withPrefix('/img/favicon.ico')}
        />
        <script src={withPrefix('/js/fontloader.js')} />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        />
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${trackingId});
          `}
        </script>
      </Helmet>
      <FileContext.Provider value={getFileMapping(data.files.edges)}>
        <IntlProvider
          locale={locale}
          defaultLocale={DEFAULT_LOCALE}
          messages={messages}
        >
          {children}
        </IntlProvider>
      </FileContext.Provider>
    </>
  );
};

GlobalLayout.displayName = displayName;

export default GlobalLayout;
