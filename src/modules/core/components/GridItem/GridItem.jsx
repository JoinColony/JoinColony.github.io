/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';

import styles from './GridItem.module.css';

type Props = {|
  body: MessageDescriptor,
  image: string,
  title: MessageDescriptor,
|};

const displayName = 'GridItem';

const GridItem = ({ body, image, title }: Props) => (
  <div className={styles.main}>
    <div>
      <Image alt={title} className={styles.image} src={image} />
    </div>
    <div>
      <Heading
        appearance={{
          theme: 'dark',
          size: 'mediumLarge',
          weight: 'medium',
        }}
        text={title}
      />
      <Paragraph text={body} />
    </div>
  </div>
);

GridItem.displayName = displayName;

export default GridItem;
