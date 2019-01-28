/* @flow */
import React, { Component, createElement, Fragment } from 'react';
import RehypeReact from 'rehype-react';
import Helmet from 'react-helmet';
import { withProps } from 'recompose';
import { graphql } from 'gatsby';

import type { Doc, Project } from '../../types';

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
  static hasChildren(node) {
    return node.children && node.children.length > 0;
  }

  static isTagName(element, tagName) {
    return element.tagName && element.tagName === tagName;
  }

  static isMethodHeading(section) {
    return (
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

  getElementTextValue = node => {
    if (DocPage.hasChildren(node)) {
      const textValues = node.children.map(child => {
        if (DocPage.hasChildren(child)) {
          return this.getElementTextValue(child);
        }
        return child.value;
      });
      return textValues.join('');
    }
    return '';
  };

  getAllImages = (node, imagePaths = []) => {
    if (DocPage.isTagName(node, 'img')) {
      imagePaths.push(node.properties.src);
    } else if (DocPage.hasChildren(node)) {
      node.children.map(child => this.getAllImages(child, imagePaths));
    }
    return imagePaths;
  };

  render() {
    const {
      data: { project, doc },
    } = this.props;
    doc.htmlAst.children.forEach(section => {
      if (DocPage.isTagName(section, 'h3')) {
        if (DocPage.isMethodHeading(section)) {
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
    const metaTitle = `${doc.frontmatter.title} - ${project.name}`;

    const seoDescription =
      this.getElementTextValue(
        doc.htmlAst.children.find(child => DocPage.isTagName(child, 'p')),
      ) || metaTitle;

    const seoImages = this.getAllImages(doc.htmlAst, [project.logo]);
    return (
      <Fragment>
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
      </Fragment>
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
