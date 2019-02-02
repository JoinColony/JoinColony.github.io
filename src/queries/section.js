/* @flow */
import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const allSectionFieldsFragment = graphql`
  fragment allSectionFieldsFragment on Section {
    id
    project
    slug
    name
    docs {
      ...allDocFieldsFragment
    }
  }
`;
