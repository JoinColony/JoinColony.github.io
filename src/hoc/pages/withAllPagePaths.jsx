/* @flow */
import type { ComponentType } from 'react';

import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

const withAllPagePaths = () => (BaseComponent: ComponentType<Object>) => (
  existingProps: Object,
) => (
  <StaticQuery
    query={graphql`
      {
        ...pagePathsFragment
      }
    `}
    render={({ allSitePage: { edges } }) => {
      const allSitePagePaths = edges.map(({ node: { path } }) => {
        if (path.endsWith('/') || path.endsWith('.html')) {
          return path;
        }
        return `${path}/`;
      });
      return (
        <BaseComponent allSitePagePaths={allSitePagePaths} {...existingProps} />
      );
    }}
  />
);

export default withAllPagePaths;
