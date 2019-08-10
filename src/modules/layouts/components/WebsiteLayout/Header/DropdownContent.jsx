/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';

import type { DropdownNavItem } from './types';

import styles from './DropdownContent.module.css';

type Props = {|
  image: string,
  navItems: Array<DropdownNavItem>,
  parentLinkText: MessageDescriptor,
|};

const displayName = 'layouts.WebsiteLayout.Header.DropdownContent';

const DropdownContent = ({ image, navItems, parentLinkText }: Props) => (
  <div className={styles.main}>
    <div>
      <Image alt={parentLinkText} className={styles.image} src={image} />
    </div>
    <div className={styles.contentContainer}>
      {navItems.map(({ body, href, title }) => (
        <div className={styles.navItem} key={href}>
          <Link className={styles.itemLink} href={href}>
            <div className={styles.navItemContainer}>
              <Heading
                appearance={{
                  margin: 'none',
                  size: 'normal',
                  theme: 'dark',
                  weight: 'medium',
                }}
                text={title}
              />
              <div className={styles.itemBody}>
                <Paragraph
                  appearance={{ margin: 'none', size: 'extraSmall' }}
                  text={body}
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

DropdownContent.displayName = displayName;

export default DropdownContent;
