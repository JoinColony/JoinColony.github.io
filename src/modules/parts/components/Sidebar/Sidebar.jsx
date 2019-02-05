/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import type { Project } from '~types';

import Button from '~core/Button';
import Link from '~core/Link';
import { orderSections, orderDocs } from '~utils/docs';

import styles from './Sidebar.module.css';

const MSG = defineMessages({
  btnBackToTop: {
    id: 'parts.Sidebar.btnBackToTop',
    defaultMessage: 'Back to Top',
  },
});

type Props = {
  project: Project,
};

const displayName = 'parts.Sidebar';

const Sidebar = ({ project }: Props) => (
  <nav className={styles.main}>
    <ul className={styles.sectionsList}>
      {project.sections
        .sort(orderSections.bind(null, project.sectionOrder))
        .map(section => (
          <li key={section.slug} className={styles.sectionItem}>
            <h5 className={styles.sectionTitle}>{section.name}</h5>
            <ul className={styles.docsList}>
              {section.docs.sort(orderDocs).map(doc => (
                <li key={doc.slug} className={styles.docsItem}>
                  <Link
                    href={`/${project.slug}/${section.slug}-${doc.slug}/`}
                    title={doc.frontmatter.title}
                    className={styles.itemLink}
                    activeClassName={styles.active}
                  >
                    {doc.frontmatter.title}
                  </Link>
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

export default Sidebar;
