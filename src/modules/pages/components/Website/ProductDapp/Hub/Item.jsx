/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';
import { getMainClasses } from '~utils/css';

import styles from './Item.module.css';

type Appearance = {|
  theme?: 'block',
|};

type Props = {|
  appearance?: Appearance,
  body: MessageDescriptor,
  bodyValues?: Object,
  image: string,
  title: MessageDescriptor,
  thumbnail?: string,
|};

const displayName = 'pages.Website.ProductDapp.Hub.Item';

const Item = ({
  appearance,
  body,
  bodyValues = {},
  image,
  title,
  thumbnail,
}: Props) => (
  <div className={getMainClasses(appearance, styles)}>
    <div className={styles.imageBlock}>
      <Image alt={title} className={styles.image} src={image} />
    </div>
    <div className={styles.contentBlock}>
      <div>
        {thumbnail && (
          <Image alt={title} className={styles.thumbnail} src={thumbnail} />
        )}
        <Heading
          appearance={{ size: 'large', theme: 'dark', weight: 'medium' }}
          text={title}
        />
        <Paragraph text={body} textValues={bodyValues} />
      </div>
    </div>
  </div>
);

Item.displayName = displayName;

export default Item;
