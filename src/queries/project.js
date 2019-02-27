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

export const allProjectsFragment = graphql`
  fragment allProjectsFragment on Query {
    projects: allProject(filter: { name: { ne: "__PROGRAMMATIC__" } }) {
      edges {
        node {
          name
          slug
          logo
          logoSmall
          description
          descriptionTranslations {
            locale
            description
          }
          sections {
            slug
            docs {
              slug
              fields {
                locale
                slug
              }
              frontmatter {
                order
                section
              }
            }
          }
          sectionOrder
          sectionTranslations {
            locale
            sectionOrder
          }
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
