/* @flow */
import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import styles from './index.module.css';

import MainLayout from '../layouts/index';

import Image from '../components/Image';
import SEO from '../components/SEO';

const IndexPage = ({ projects }) => {
  const title = 'Colony Open Source Docs';
  const introText =
    "Just like the organizations that will run on Colony, each component in the colony stack is the product of collaboration and open engagement. Here, you'll find the up-to-date documentation for all of the Colony projects.";
  return (
    <MainLayout>
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
                  If you're a developer looking to contribute, you can find all
                  of Colony's open-source repositories on GitHub.
                </p>
              </div>
            </div>
          </section>
          <section className={styles.projectContainer}>
            {projects &&
              projects.map(project => (
                <div key={project.name} className={styles.projectContainerItem}>
                  <Image
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
                      to={`/${project.slug}/${project.entryPoint}`}
                    >
                      View Docs
                    </Link>
                  </p>
                </div>
              ))}
          </section>
        </main>
      </Fragment>
    </MainLayout>
  );
};

export default IndexPage;
