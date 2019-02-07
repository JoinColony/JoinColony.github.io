/* @flow */
import type { Node } from 'react';
import type { RouteProps } from '@reach/router';

import React, { Fragment } from 'react';
import { compose, fromRenderProps } from 'recompose';
import { Location } from '@reach/router';
import { parse } from 'query-string';
import Helmet from 'react-helmet';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import { StaticQuery, graphql, withPrefix } from 'gatsby';

import FileContext from '~context/FileContext';

import messages from '../../../../i18n/en.json';

addLocaleData(en);

const getFileMapping = files => {
  return files.reduce((current, next) => {
    // eslint-disable-next-line no-param-reassign
    current[`${next.node.sourceInstanceName}/${next.node.relativePath}`] =
      next.node.publicURL;
    return current;
  }, {});
};

type Props = RouteProps & {
  children: Node,
};

const displayName = 'layouts.GlobalLayout';

const GlobalLayout = ({ children, location }: Props) => {
  const searchParams =
    location && location.search ? parse(location.search) : {};
  const locale = searchParams.locale || 'en';
  return (
    <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
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
