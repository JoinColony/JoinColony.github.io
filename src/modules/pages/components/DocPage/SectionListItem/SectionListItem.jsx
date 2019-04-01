/* @flow */
import React, { useState } from 'react';

import type { Section } from '~types';

import Button from '~core/Button';
import Heading from '~core/Heading';
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
          <svg
            className={styles.expandArrow}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            {/* eslint-disable-next-line max-len */}
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
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
};

SectionListItem.displayName = displayName;

export default SectionListItem;
