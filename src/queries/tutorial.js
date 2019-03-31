/* @flow */
import { graphql } from 'gatsby';

export const allTutorialsFragment = graphql`
  fragment allTutorialsFragment on Query {
    allTutorials: allTutorial {
      edges {
        node {
          name
          fields {
            slug
          }
        }
      }
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const singleTutorialFragment = graphql`
  fragment singleTutorialFragment on Query {
    tutorial: markdownRemark(id: { eq: $tutorialId }) {
      editUrl
      frontmatter {
        author
        order
        publishDate
        title
      }
      htmlAst
    }
  }
`;
