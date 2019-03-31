/* @flow */
import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const singleTutorialFragment = graphql`
  fragment singleTutorialFragment on Query {
    tutorial: markdownRemark(id: { eq: $tutorialId }) {
      frontmatter {
        title
      }
      htmlAst
    }
  }
`;
