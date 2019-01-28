/* @flow */
import React, { Component, createElement } from 'react';
import RehypeReact from 'rehype-react';
import Helmet from 'react-helmet';
import { withProps } from 'recompose';
import { graphql } from 'gatsby';

import type { Doc, HtmlAst, Project } from '../../types';

import MainLayout from '../../layouts';

import Link from '../../components/Link';
import Sidebar from '../../components/Sidebar';
import Image from '../../components/Image';
import SEO from '../../components/SEO';

import styles from './DocPage.module.css';

type Props = {
  data: {
    project: Project,
    doc: Doc,
  }, // @TODO better typing
};

class DocPage extends Component<Props> {
  renderAst: (node: Object) => void;

  static isTagName(element: HtmlAst, tagName: string): boolean {
    return !!element.tagName && element.tagName === tagName;
  }

  static isMethodHeading(section: HtmlAst) {
    return (
      section.children &&
      section.children.length === 2 &&
      DocPage.isTagName(section.children[0], 'a') &&
      DocPage.isTagName(section.children[1], 'code')
    );
  }

  constructor(props: Props) {
    super(props);

    this.renderAst = new RehypeReact({
      createElement,
      components: {
        a: Link,
        img: withProps({ project: props.data.project.name })(Image),
      },
    }).Compiler;
  }

  getElementTextValue = (node?: HtmlAst) => {
    if (node && node.children && node.children.length > 0) {
      const textValues = node.children.map(child => {
        if (child.children && child.children.length > 0) {
          return this.getElementTextValue(child);
        }
        return child.value;
      });
      return textValues.join('');
    }
    return '';
  };

  getAllImages = (node: HtmlAst, imagePaths: Array<string> = []) => {
    if (DocPage.isTagName(node, 'img') && node.properties) {
      imagePaths.push(node.properties.src);
    } else if (node.children && node.children.length > 0) {
      node.children.map(child => this.getAllImages(child, imagePaths));
    }
    return imagePaths;
  };

  render() {
    const {
      data: { project, doc },
    } = this.props;
    if (doc.htmlAst.children) {
      doc.htmlAst.children.forEach(section => {
        if (DocPage.isTagName(section, 'h3')) {
          if (DocPage.isMethodHeading(section) && section.properties) {
            if (
              section.properties.className &&
              Array.isArray(section.properties.className)
            ) {
              section.properties.className.push(styles.methodHeading);
            } else {
              // eslint-disable-next-line no-param-reassign
              section.properties.className = [styles.methodHeading];
            }
          }
        }
      });
    }
    const metaTitle = `${doc.frontmatter.title} - ${project.name}`;

    const seoDescription =
      (doc.htmlAst.children &&
        doc.htmlAst.children.length > 0 &&
        this.getElementTextValue(
          doc.htmlAst.children.find(child => DocPage.isTagName(child, 'p')),
        )) ||
      metaTitle;

    const seoImages = this.getAllImages(doc.htmlAst, [project.logo]);
    return (
      <MainLayout>
        <Helmet>
          <title>{metaTitle}</title>
        </Helmet>
        <SEO
          title={metaTitle}
          description={seoDescription}
          images={seoImages}
          project={project.name}
          isDocPage
        />
        <nav className={styles.sidebar}>
          <Sidebar project={project} />
        </nav>
        <main className={styles.content}>
          <h1 className={styles.docTitle}>{doc.frontmatter.title}</h1>
          <div className={styles.editUrlContainer}>
            <p>
              <Link href={doc.editUrl}>Improve this doc</Link>
            </p>
          </div>
          {this.renderAst(doc.htmlAst)}
        </main>
      </MainLayout>
    );
  }
}

export const pageQuery = graphql`
  query projectAndDocQuery($docId: String!, $projectName: String!) {
    doc: markdownRemark(id: { eq: $docId }) {
      frontmatter {
        title
      }
      editUrl
      htmlAst
    }
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

export default DocPage;
