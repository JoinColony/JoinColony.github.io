/* @flow */
import { graphql } from 'gatsby';

export const allProjectNamesFragment = graphql`
  fragment allProjectNamesFragment on Query {
    allProject(filter: { name: { ne: "__PROGRAMMATIC__" } }) {
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
      sectionTranslations {
        locale
        sectionOrder
      }
      sections {
        name
        slug
        docs {
          slug
          fields {
            locale
            slug
          }
          frontmatter {
            title
            order
            section
          }
        }
      }
    }
  }
`;
