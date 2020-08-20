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

export const allProjectsFragment = graphql`
  fragment allProjectsFragment on Query {
    projects: allProject {
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
          repoUrl
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

export const coreProjectsFragment = graphql`
  fragment coreProjectsFragment on Query {
    coreProjects: allProject(filter: { name: { in: ["colonyNetwork"] } }) {
      edges {
        node {
          slug
          name
          description
          logo
          logoSmall
          repoUrl
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
    }
  }
`;

export const externalProjectsFragment = graphql`
  fragment externalProjectsFragment on Query {
    site {
      siteMetadata {
        externalDocs {
          entryPoint
          logo
          logoSmall
          name
          repoUrl
          type
        }
      }
    }
  }
`;

export const openSourceProjectsFragment = graphql`
  fragment openSourceProjectsFragment on Query {
    openSourceProjects: allProject(
      filter: {
        name: {
          in: ["budgetBox", "tailor", "pinion", "trufflepig", "solcover"]
        }
      }
    ) {
      edges {
        node {
          slug
          name
          description
          logo
          logoSmall
          repoUrl
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
    }
  }
`;

export const singleProjectFragment = graphql`
  fragment singleProjectFragment on Query {
    project(name: { eq: $projectName }) {
      slug
      name
      logo
      logoSmall
      repoUrl
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
