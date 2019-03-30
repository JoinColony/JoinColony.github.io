/* @flow */
import React, { Component, createElement } from 'react';
import { defineMessages } from 'react-intl';
import RehypeReact from 'rehype-react';
import Helmet from 'react-helmet';
import { withProps } from 'recompose';
import { graphql } from 'gatsby';
import slugify from 'slugify';

import type { Doc, HtmlAst, Project } from '~types';

import Link from '~core/Link';
import Image from '~core/Image';
import DeveloperPortalLayout from '~layouts/DeveloperPortalLayout';
import Sidebar from '~parts/Sidebar';
import SEO from '~parts/SEO';
import { COLONY_DISCOURSE_SUPPORT } from '~routes';

import CtaItem from './CtaItem';

import styles from './DocPage.module.css';

const MSG = defineMessages({
  ctaSupportHeading: {
    id: 'templates.DocPage.ctaSupportHeading',
    defaultMessage: 'Support',
  },
  ctaSupportContent: {
    id: 'templates.DocPage.ctaSupportContent',
    defaultMessage:
      'Questions? Problems? Existential dilemmas? We’re here to help!',
  },
  ctaSupportLinkText: {
    id: 'templates.DocPage.ctaSupportLinkText',
    defaultMessage: 'Contact DevRel',
  },
  ctaImproveDocHeading: {
    id: 'templates.DocPage.ctaImproveDocHeading',
    defaultMessage: 'Improve this doc.',
  },
  ctaImproveDocContent: {
    id: 'templates.DocPage.ctaImproveDocContent',
    defaultMessage:
      // eslint-disable-next-line max-len
      'All improvements to documentation are welcome and encouraged. Submit a PR for documentation on GitHub.',
  },
  ctaImproveDocLinkText: {
    id: 'templates.DocPage.ctaSupportLinkText',
    defaultMessage: 'To the repo!',
  },
});

type Props = {|
  data: {
    project: Project,
    doc: Doc,
    allProject: {
      edges: Array<{
        node: {
          name: string,
        },
      }>,
    },
  },
  pageContext: {
    slugPrefix: string,
  },
|};

class DocPage extends Component<Props> {
  renderAst: (node: Object) => void;

  static displayName = 'templates.DocPage';

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
        a: withProps({
          transformUrl: this.transformInternalUrls,
          persistLocale: false,
        })(Link),
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

  transformInternalUrls = (href: string): string => {
    const {
      data: {
        allProject: { edges: projectNodes },
      },
      pageContext: { slugPrefix },
    } = this.props;
    let url: string = href.toLowerCase();

    // Get possible project slugs (both camelCase & lowercase for each project)
    const projectNameSlugs: Array<string> = projectNodes.reduce(
      (names, { node }) => {
        names.push(slugify(node.name), slugify(node.name, { lower: true }));
        return names;
      },
      [],
    );

    // Get the non-empty url parts
    const urlParts: Array<string> = url.split('/').filter(part => !!part);

    /*
     * Docs links within the docs are written in 1 of 2 forms:
     *     1) With locale (non-default): `/locale/projectSlug/docPageSlug/`
     *     2) Without locale (default language): `/projectSlug/docPageSlug/`
     */
    const hasLocale: boolean = urlParts.length === 3;
    const localePrefix: string = hasLocale ? `/${urlParts[0]}` : '';
    const isDocPage: boolean = projectNameSlugs.some(projectName =>
      url.startsWith(`${localePrefix}/${projectName}/`),
    );
    if (isDocPage && hasLocale) {
      url = url.replace(localePrefix, '');
    }
    // If it's a doc page and a slug prefix is configured, add the prefix to the url
    return isDocPage && slugPrefix
      ? `${localePrefix}/${slugPrefix}${url}`
      : url;
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
      <DeveloperPortalLayout>
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
        <div className={styles.main}>
          <div className={styles.mainInnerContainer}>
            <nav className={styles.sidebar}>
              <Sidebar project={project} />
            </nav>
            <main className={styles.content}>
              <div className={styles.mainImage}>
                <Image
                  alt={project.name}
                  project={project.name}
                  src={project.logo}
                />
              </div>
              <div className={styles.astContent}>
                <h1 className={styles.docTitle}>{doc.frontmatter.title}</h1>
                {this.renderAst(doc.htmlAst)}
              </div>
              <div className={styles.ctaContainer}>
                <div className={styles.ctaItem}>
                  <CtaItem
                    contentText={MSG.ctaSupportContent}
                    headingText={MSG.ctaSupportHeading}
                    linkText={MSG.ctaSupportLinkText}
                    linkUrl={COLONY_DISCOURSE_SUPPORT}
                  />
                </div>
                <div className={styles.ctaItem}>
                  <CtaItem
                    contentText={MSG.ctaImproveDocContent}
                    headingText={MSG.ctaImproveDocHeading}
                    linkText={MSG.ctaImproveDocLinkText}
                    linkUrl={doc.editUrl}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </DeveloperPortalLayout>
    );
  }
}

export const pageQuery = graphql`
  query projectAndDocQuery($docId: String!, $projectName: String!) {
    ...singleDocFragment
    ...singleProjectFragment
    ...allProjectNamesFragment
  }
`;

export default DocPage;
