/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';

import type { Project } from '~types';

import Heading from '~core/Heading';
import Link from '~core/Link';
import { getDocsForLocale, getSectionsForLocale, orderDocs } from '~utils/docs';

import styles from './SectionList.module.css';

type Props = {|
  /* Injected via `injectIntl` */
  intl: IntlShape,
  project: Project,
|};

const displayName = 'pages.DocPage.SectionList';

const SectionList = ({ intl: { locale }, project }: Props) => (
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
);

SectionList.displayName = displayName;

export default injectIntl(SectionList);
