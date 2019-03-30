/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

import type { Project } from '~types';

import Button from '~core/Button';
import Heading from '~core/Heading';
import Link from '~core/Link';
import { getDocsForLocale, getSectionsForLocale, orderDocs } from '~utils/docs';
import { PAGE_DEVELOPER_PORTAL } from '~routes';

import styles from './Sidebar.module.css';

const MSG = defineMessages({
  linkHome: {
    id: 'parts.Sidebar.linkHome',
    defaultMessage: 'Home',
  },
  btnBackToTop: {
    id: 'parts.Sidebar.btnBackToTop',
    defaultMessage: 'Back to Top',
  },
});

type Props = {|
  intl: IntlShape,
  project: Project,
|};

const displayName = 'parts.Sidebar';

const Sidebar = ({
  intl: { locale },
  project: { name: projectName },
  project,
}: Props) => (
  <nav className={styles.main}>
    <Link
      arrow="left"
      className={styles.homeLink}
      href={PAGE_DEVELOPER_PORTAL}
      text={MSG.linkHome}
    />
    <div className={styles.projectTitle}>
      <Heading
        appearance={{ size: 'mediumLarge', theme: 'dark', weight: 'medium' }}
        text={projectName}
      />
    </div>
    <ul className={styles.sectionsList}>
      {getSectionsForLocale(project, locale).map(({ docs, name, slug }) => (
        <li key={slug} className={styles.sectionItem}>
          <Heading
            appearance={{
              margin: 'double',
              size: 'medium',
              weight: 'medium',
            }}
            style={{ color: styles.textColor }}
            text={name}
          />
          <ul className={styles.docsList}>
            {getDocsForLocale(docs, locale)
              .sort(orderDocs)
              .map(doc => (
                <li key={doc.slug} className={styles.docsItem}>
                  <Link
                    href={doc.fields.slug}
                    title={doc.frontmatter.title}
                    className={styles.itemLink}
                    activeClassName={styles.active}
                    text={doc.frontmatter.title}
                    persistLocale={false}
                  />
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
    <div className={styles.backToTop}>
      <Button
        className={styles.itemLink}
        onClick={handleBackToTop}
        text={MSG.btnBackToTop}
      />
    </div>
  </nav>
);

Sidebar.displayName = displayName;

function handleBackToTop(e) {
  if (typeof window !== 'undefined') {
    e.preventDefault();
    window.scrollTo(0, 0);
  }
}

export default injectIntl(Sidebar);
