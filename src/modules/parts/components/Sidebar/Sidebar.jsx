/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

import type { Project } from '~types';

import Button from '~core/Button';
import Link from '~core/Link';
import {
  getDocsForLocale,
  getSectionsForLocale,
  orderSections,
  orderDocs,
} from '~utils/docs';

import styles from './Sidebar.module.css';

const MSG = defineMessages({
  btnBackToTop: {
    id: 'parts.Sidebar.btnBackToTop',
    defaultMessage: 'Back to Top',
  },
});

type Props = {
  intl: IntlShape,
  project: Project,
};

const displayName = 'parts.Sidebar';

const Sidebar = ({ intl: { locale }, project }: Props) => (
  <nav className={styles.main}>
    <ul className={styles.sectionsList}>
      {getSectionsForLocale(project.sections, locale)
        .sort(orderSections.bind(null, project.sectionOrder))
        .map(({ docs, name, slug }) => (
          <li key={slug} className={styles.sectionItem}>
            <h5 className={styles.sectionTitle}>{name}</h5>
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
