/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';

import styles from './GridItem.module.css';

type Props = {|
  body: MessageDescriptor,
  image: string,
  links?: Array<{ href: string, text: MessageDescriptor }>,
  title: MessageDescriptor,
|};

const displayName = 'GridItem';

const GridItem = ({ body, image, links = [], title }: Props) => (
  <div className={styles.main}>
    <div>
      <Image alt={title} className={styles.image} src={image} />
    </div>
    <div className={styles.content}>
      <div className={styles.contentInner}>
        <div className={styles.heading}>
          <Heading
            appearance={{
              theme: 'dark',
              size: 'mediumLarge',
              weight: 'medium',
            }}
            text={title}
          />
        </div>
        <div className={styles.body}>
          <Paragraph text={body} />
        </div>
      </div>
      {links.map(({ href, text }) => (
        <div className={styles.links}>
          <Link className={styles.itemLink} href={href} text={text} />
        </div>
      ))}
    </div>
  </div>
);

GridItem.displayName = displayName;

export default GridItem;
