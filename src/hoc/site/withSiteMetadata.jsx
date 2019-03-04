/* @flow */
import type { ComponentType } from 'react';

import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import type { Site } from '~types';

const withSiteMetadata = () => (BaseComponent: ComponentType<Object>) => (
  existingProps: Object,
) => (
  <StaticQuery
    query={graphql`
      {
        ...siteMetadataFragment
      }
    `}
    render={(queryData: Site) => (
      <BaseComponent {...queryData} {...existingProps} />
    )}
  />
);

export default withSiteMetadata;
