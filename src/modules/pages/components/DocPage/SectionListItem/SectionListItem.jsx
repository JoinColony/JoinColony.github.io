/* @flow */
import React from 'react';

import type { Section } from '~types';

import Heading from '~core/Heading';
import Link from '~core/Link';
import { getDocsForLocale, orderDocs } from '~utils/docs';

import styles from './SectionListItem.module.css';

type Props = {|
  locale: string,
  section: Section,
|};

const displayName = 'pages.DocPage.SectionListItem';

const SectionListItem = ({ locale, section: { docs, name } }: Props) => (
  <li className={styles.sectionItem}>
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
);

SectionListItem.displayName = displayName;

export default SectionListItem;
