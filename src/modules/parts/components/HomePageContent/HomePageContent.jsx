/* @flow */
import type { IntlShape } from 'react-intl';

import React, { Fragment } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';

import type { Project } from '~types';

import Button from '~core/Button';
import Heading from '~core/Heading';
import Image from '~core/Image';
import SEO from '~parts/SEO';

import styles from './HomePageContent.module.css';

const MSG = defineMessages({
  title: {
    id: 'parts.HomePageContent.title',
    defaultMessage: 'Colony Open Source Docs',
  },
  contentHeroTitle: {
    id: 'parts.HomePageContent.contentHeroTitle',
    defaultMessage: 'The Colony {lineBreak} Developer Docs',
  },
  contentIntroText: {
    id: 'parts.HomePageContent.contentIntroText',
    defaultMessage: `Just like the organizations that will run on Colony,
each component in the colony stack is the product of collaboration and open
engagement. Here, you'll find the up-to-date documentation for all of the
Colony projects.`,
  },
  contentIntroSubtext: {
    id: 'parts.HomePageContent.contentIntroSubtext',
    defaultMessage: `If you're a developer looking to contribute, you can find
all of Colony's open-source repositories on GitHub.`,
  },
});

type Props = {
  /** Injected by `injectIntl` */
  intl: IntlShape,
  projects: Array<Project>,
};

const displayName = 'parts.HomePageContent';

const HomePageContent = ({ intl: { formatMessage }, projects }: Props) => {
  const title = formatMessage(MSG.title);
  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <SEO title={title} description={MSG.contentIntroText} />
      <main className={styles.content}>
        <section className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <Heading className={styles.heroTitle}>
              <FormattedMessage
                {...MSG.contentHeroTitle}
                values={{ lineBreak: <br className={styles.heroTitleBreak} /> }}
              />
            </Heading>
            <div className={styles.heroDescription}>
              <p className={styles.textExplainer}>
                <FormattedMessage {...MSG.contentIntroText} />
              </p>
              <p>
                <FormattedMessage {...MSG.contentIntroSubtext} />
              </p>
            </div>
          </div>
        </section>
        <section className={styles.projectContainer}>
          {projects &&
            projects.map(project => (
              <div key={project.name} className={styles.projectContainerItem}>
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
                  <Button
                    linkTo={project.entryPoint}
                    persistLocale={false}
                    text={{ id: 'btn.viewDocs' }}
                  />
                </p>
              </div>
            ))}
        </section>
      </main>
    </Fragment>
  );
};

HomePageContent.displayName = displayName;

export default HomePageContent;
