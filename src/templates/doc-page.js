import React, { Component, createElement, Fragment } from 'react'
import rehypeReact from 'rehype-react'
import Helmet from 'react-helmet'
import { withProps } from 'recompose'
import { graphql } from 'gatsby'

import Link from '../components/Link'
import Sidebar from '../components/Sidebar'
import Image from '../components/Image'
import styles from './doc-page.module.css'
import SEO from '../components/SEO'

class DocPage extends Component {
  constructor(props) {
    super(props)

    this.renderAst = new rehypeReact({
      createElement,
      components: {
        a: Link,
        img: withProps({ project: props.data.project.name })(Image),
      },
    }).Compiler
  }

  hasChildren(node) {
    return node.children && node.children.length > 0
  }

  isTagName(element, tagName) {
    return element.tagName && element.tagName === tagName
  }

  isMethodHeading(section) {
    return (
      section.children.length === 2 &&
      this.isTagName(section.children[0], 'a') &&
      this.isTagName(section.children[1], 'code')
    )
  }

  getElementTextValue(node) {
    if (this.hasChildren(node)) {
      let textValues = node.children.map(child => {
        if (this.hasChildren(child)) {
          return this.getElementTextValue(child)
        }
        return child.value
      })
      return textValues.join('')
    }
    return ''
  }

  getAllImages(node, imagePaths = []) {
    if (this.isTagName(node, 'img')) {
      imagePaths.push(node.properties.src)
    } else if (this.hasChildren(node)) {
      node.children.map(child => this.getAllImages(child, imagePaths))
    }
    return imagePaths
  }

  render() {
    const {
      data: { project, doc },
    } = this.props
    doc.htmlAst.children.forEach(section => {
      if (this.isTagName(section, 'h3')) {
        if (this.isMethodHeading(section)) {
          if (
            section.properties.className &&
            Array.isArray(section.properties.className)
          ) {
            section.properties.className.push(styles.methodHeading)
          } else {
            section.properties['className'] = [styles.methodHeading]
          }
        }
      }
    })
    const metaTitle = `${doc.frontmatter.title} - ${project.name}`

    const seoDescription =
      this.getElementTextValue(
        doc.htmlAst.children.find(child => this.isTagName(child, 'p'))
      ) || metaTitle

    const seoImages = this.getAllImages(doc.htmlAst, [project.logo])
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
          isDocPage={true}
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
    )
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
`

export default DocPage
