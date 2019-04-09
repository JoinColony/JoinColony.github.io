/* @flow */
import { graphql } from 'gatsby';

export const allDocFieldsFragment = graphql`
  fragment allDocFieldsFragment on MarkdownRemark {
    id
    htmlAst
    frontmatter {
      order
      title
      section
    }
    slug
    editUrl
    excerpt
    headings {
      value
      depth
    }
    timeToRead
    tableOfContents
  }
`;

export const singleDocFragment = graphql`
  fragment singleDocFragment on Query {
    doc: markdownRemark(id: { eq: $docId }) {
      editUrl
      frontmatter {
        title
      }
      htmlAst
      tableOfContents
    }
  }
`;
