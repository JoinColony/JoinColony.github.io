/* @flow */
import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const pagePathsFragment = graphql`
  fragment pagePathsFragment on Query {
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`;
