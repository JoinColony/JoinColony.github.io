/* @flow */
import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const siteMetadataFragment = graphql`
  fragment siteMetadataFragment on Query {
    site {
      siteMetadata {
        siteUrl
        title
        langConfig {
          defaultLangKey
          langs
          prefixDefaultLangKey
        }
      }
    }
  }
`;
