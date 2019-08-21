/* @flow */

import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const threeBlogPostsFragment = graphql`
  fragment threeBlogPostsFragment on Query {
    posts: allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      limit: 3
    ) {
      edges {
        node {
          id
          custom_excerpt
          excerpt
          feature_image
          title
          url
        }
      }
    }
  }
`;
