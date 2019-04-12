/* @flow */
import React, { useState } from 'react';

import type { Section } from '~types';

import Button from '~core/Button';
import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';
import { getDocsForLocale, orderDocs } from '~utils/docs';

import styles from './SectionListItem.module.css';

type Props = {|
  locale: string,
  section: Section,
|};

const displayName = 'pages.DocPage.SectionListItem';

const SectionListItem = ({ locale, section: { docs, name } }: Props) => {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const sectionHeadingProps = {
    appearance: {
      margin: 'none',
      size: 'medium',
      weight: 'medium',
    },
    style: { color: styles.textColor },
    text: name,
  };
  return (
    <li className={styles.main} aria-expanded={isSectionOpen}>
      <span className={styles.mobileSectionExpander}>
        <Button
          appearance={{ theme: 'reset' }}
          onClick={() => setIsSectionOpen(!isSectionOpen)}
        >
          <Heading {...sectionHeadingProps} />
          <Icon className={styles.expandArrow} name="chevron" title={name} />
        </Button>
      </span>
      <span className={styles.sectionTitle}>
        <Heading {...sectionHeadingProps} />
      </span>
      <ul className={styles.docsList}>
        {getDocsForLocale(docs, locale)
          .sort(orderDocs)
          .map(doc => (
            <li key={doc.slug} className={styles.docsItem}>
              <Link
                activeClassName={styles.active}
                className={styles.itemLink}
                href={doc.fields.slug}
                persistLocale={false}
                state={{ fromParent: true }}
                text={doc.frontmatter.title}
                title={doc.frontmatter.title}
              />
            </li>
          ))}
      </ul>
    </li>
  );
};

SectionListItem.displayName = displayName;

export default SectionListItem;
