/* @flow */
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import styles from './HomePage.module.css';

import MainLayout from '../../layouts/index';

import Link from '../../components/Link';
import Image from '../../components/Image';
import SEO from '../../components/SEO';

import { orderSections, orderDocs } from '../../utils';

const getEntryPoint = project => {
  const firstSection = project.sections.sort((a, b) =>
    orderSections(project.sectionOrder, a, b),
  )[0];
  const firstDoc = firstSection.docs.sort(orderDocs)[0];
  return `${firstSection.slug}-${firstDoc.slug}`;
};

const transformProjectData = edge => {
  const edgeNode = edge.node;
  edgeNode.entryPoint = getEntryPoint(edge.node);
  return edgeNode;
};

const IndexPage = () => {
  const title = 'Colony Open Source Docs';
  const introText = `Just like the organizations that will run on Colony,
each component in the colony stack is the product of collaboration and open
engagement. Here, you'll find the up-to-date documentation for all of the
Colony projects.`;
  return (
    <MainLayout>
      <StaticQuery
        query={graphql`
          {
            projects: allProject {
              edges {
                node {
                  name
                  slug
                  logo
                  logoSmall
                  description
                  sections {
                    slug
                    docs {
                      slug
                      frontmatter {
                        order
                      }
                    }
                  }
                  sectionOrder
                }
              }
            }
            files: allFile {
              edges {
                node {
                  sourceInstanceName
                  relativePath
                  publicURL
                }
              }
            }
          }
        `}
        render={data => {
          const projects = data.projects.edges.map(transformProjectData) || [];
          return (
            <Fragment>
              <Helmet>
                <title>{title}</title>
              </Helmet>
              <SEO title={title} description={introText} />
              <main className={styles.content}>
                <section className={styles.heroContainer}>
                  <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                      The Colony
                      <br className={styles.heroTitleBreak} />
                      Developer Docs
                    </h1>
                    <div className={styles.heroDescription}>
                      <p className={styles.textExplainer}>{introText}</p>
                      <p>
                        If you&apos;re a developer looking to contribute, you
                        can find all of Colony&apos;s open-source repositories
                        on GitHub.
                      </p>
                    </div>
                  </div>
                </section>
                <section className={styles.projectContainer}>
                  {projects &&
                    projects.map(project => (
                      <div
                        key={project.name}
                        className={styles.projectContainerItem}
                      >
                        <Image
                          alt={project.name}
                          className={styles.projectLogo}
                          project={project.name}
                          src={project.logo}
                        />
                        <p className={styles.projectDescription}>
                          {project.description}
                        </p>
                        <p className={styles.linkContainer}>
                          <Link
                            id="projectButton"
                            href={`/${project.slug}/${project.entryPoint}`}
                          >
                            View Docs
                          </Link>
                        </p>
                      </div>
                    ))}
                </section>
              </main>
            </Fragment>
          );
        }}
      />
    </MainLayout>
  );
};

export default IndexPage;
