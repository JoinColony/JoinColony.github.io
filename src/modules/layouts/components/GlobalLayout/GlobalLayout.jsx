/* @flow */
import type { Node } from 'react';
import type { RouteProps } from '@reach/router';
import type { $npm$ReactIntl$LocaleData } from 'react-intl';

import React, { Fragment } from 'react';
import { compose, fromRenderProps } from 'recompose';
import { Location } from '@reach/router';
import { parse } from 'query-string';
import Helmet from 'react-helmet';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import { StaticQuery, graphql, withPrefix } from 'gatsby';

import FileContext from '~context/FileContext';

import { DEFAULT_LOCALE } from '~i18n/locale';
import enMessages from '~i18n/en.json';

type LocaleMessage = { [key: string]: string };

type LocaleConfig = {|
  messages: LocaleMessage,
  data: $npm$ReactIntl$LocaleData,
|};
type LocaleConfigs = {
  [locale: string]: LocaleConfig,
};

type Props = RouteProps & {
  children: Node,
};

const localeMessages: LocaleConfigs = {
  en: {
    messages: enMessages,
    data: enLocaleData,
  },
};

const configuredLocalesData = Object.keys(localeMessages).reduce(
  (accumulator, configKey) => {
    const locales = [...accumulator, ...localeMessages[configKey].data];
    return locales;
  },
  [],
);

addLocaleData(configuredLocalesData);

const localeIsConfigured = (locale: string): boolean =>
  !!localeMessages[locale];

const getMessagesForLocale = (locale: string): LocaleMessage =>
  localeMessages[locale].messages || localeMessages[DEFAULT_LOCALE].messages;

const getFileMapping = files => {
  return files.reduce((current, next) => {
    // eslint-disable-next-line no-param-reassign
    current[`${next.node.sourceInstanceName}/${next.node.relativePath}`] =
      next.node.publicURL;
    return current;
  }, {});
};

const displayName = 'layouts.GlobalLayout';

const GlobalLayout = ({ children, location }: Props) => {
  const searchParams: Object =
    location && location.search ? parse(location.search) : {};
  const requestedLocale: string = searchParams.locale || DEFAULT_LOCALE;
  const locale: string = localeIsConfigured(requestedLocale)
    ? requestedLocale
    : DEFAULT_LOCALE;
  const messages: LocaleMessage = getMessagesForLocale(locale);
  return (
    <IntlProvider
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
      messages={messages}
    >
      <StaticQuery
        query={graphql`
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
        `}
        render={data => (
          <Fragment>
            <Helmet>
              <link
                rel="shortcut icon"
                type="image/png"
                href={withPrefix('/img/favicon.ico')}
              />
              <script src={withPrefix('/js/fontloader.js')} />
            </Helmet>
            <FileContext.Provider value={getFileMapping(data.files.edges)}>
              {children}
            </FileContext.Provider>
          </Fragment>
        )}
      />
    </IntlProvider>
  );
};

GlobalLayout.displayName = displayName;

const enhance = compose(
  // $FlowFixMe
  fromRenderProps(Location, locationProps => ({ ...locationProps })),
);

export default enhance(GlobalLayout);
