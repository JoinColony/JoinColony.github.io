/* @flow */
import React from 'react';

import type { Project } from '~types';

import styles from './Sidebar.module.css';
import Link from '~core/Link';

import { orderSections, orderDocs } from '~utils';

type Props = {
  project: Project,
};

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
      <button
        className={styles.itemLink}
        onClick={handleBackToTop}
        type="button"
      >
        <small>Back to Top</small>
      </button>
    </div>
  </nav>
);

function handleBackToTop(e) {
  if (typeof window !== 'undefined') {
    e.preventDefault();
    window.scrollTo(0, 0);
  }
}

export default Sidebar;
