/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import Popover from '~core/Popover';

import type { DropdownNavItem } from './types';

import DropdownContent from './DropdownContent.jsx';

import styles from './NavDropdownParent.module.css';

type Props = {|
  className: string,
  image: string,
  navItems: Array<DropdownNavItem>,
  text: MessageDescriptor,
|};

const displayName = 'layouts.WebsiteLayout.Header.NavDropdownParent';

const NavDropdownParent = ({ className, image, navItems, text }: Props) => (
  <span className={`${className} ${styles.dropdownParentLink}`}>
    <Button appearance={{ theme: 'reset' }}>
      <Popover
        content={() => (
          <DropdownContent
            image={image}
            navItems={navItems}
            parentLinkText={text}
          />
        )}
        isOpen
        placement="bottom-end"
        showArrow={false}
        trigger="disabled"
        wrapperClassName={styles.dropdownContainer}
      >
        <div className={styles.dropdownParent} aria-haspopup="true">
          <FormattedMessage {...text} />
        </div>
      </Popover>
    </Button>
  </span>
);

NavDropdownParent.displayName = displayName;

export default NavDropdownParent;
