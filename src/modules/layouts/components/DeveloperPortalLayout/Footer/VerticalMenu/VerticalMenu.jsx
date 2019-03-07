/* @flow */
import type { MessageDescriptor } from 'react-intl';

import React from 'react';

import type { InProps as LinkProps } from '~core/Link/types';

import Heading from '~core/Heading';
import Link from '~core/Link';

import styles from './VerticalMenu.module.css';

type Props = {|
  headingText?: MessageDescriptor | string,
  headingTextValues?: Object,
  menuItems: Array<LinkProps>,
  numColumns?: number,
|};

const displayName = 'layouts.DeveloperPortalLayout.Footer.VerticalMenu';

const VerticalMenu = ({
  headingText,
  headingTextValues,
  menuItems,
  numColumns = 1,
}: Props) => {
  const columnStyles = {
    columnCount: `${numColumns}`,
  };
  return (
    <>
      {headingText && (
        <Heading
          appearance={{ size: 'small', theme: 'invert', weight: 'medium' }}
          text={headingText}
          textValues={headingTextValues}
        />
      )}
      {menuItems.length > 0 && (
        <ul className={styles.menu} style={columnStyles}>
          {menuItems.map(menuItemProps => (
            <li className={styles.menuItem} key={menuItemProps.href}>
              <Link {...menuItemProps} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

VerticalMenu.displayName = displayName;

export default VerticalMenu;
