/* @flow */
import { graphql } from 'gatsby';

export const allProjectNamesFragment = graphql`
  fragment allProjectNamesFragment on Query {
    allProject {
      edges {
        node {
          name
        }
      }
    }
  }
`;

export const singleProjectFragment = graphql`
  fragment singleProjectFragment on Query {
    project(name: { eq: $projectName }) {
      slug
      name
      logo
      sectionOrder
      sections {
        name
        slug
        docs {
          slug
          frontmatter {
            title
            order
          }
        }
      }
    }
  }
`;
