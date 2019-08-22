/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import Icon from '~core/Icon';
import Popover from '~core/Popover';

import type { DropdownNavItem } from './types';

import DropdownContent from './DropdownContent.jsx';
import DropdownContentMobile from './DropdownContentMobile.jsx';

import styles from './NavDropdownParent.module.css';

type Props = {|
  className: string,
  image: string,
  navItems: Array<DropdownNavItem>,
  text: MessageDescriptor,
|};

const displayName = 'layouts.WebsiteLayout.Header.NavDropdownParent';

const NavDropdownParent = ({ className, image, navItems, text }: Props) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  return (
    <span className={`${className} ${styles.dropdownParentLink}`}>
      <Button
        appearance={{ theme: 'reset' }}
        className={styles.buttonLink}
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
      >
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
          trigger="disabled"
          wrapperClassName={styles.dropdownContainer}
        >
          <div className={styles.dropdownParent} aria-haspopup="true">
            <FormattedMessage {...text} />
            <Icon
              className={`${styles.chevron} ${
                isMobileExpanded ? styles.expandedIcon : ''
              }`}
              name="chevron"
              title={text}
            />
          </div>
        </Popover>
      </Button>
      <DropdownContentMobile
        isExpanded={isMobileExpanded}
        navItems={navItems}
      />
    </span>
  );
};

NavDropdownParent.displayName = displayName;

export default NavDropdownParent;
