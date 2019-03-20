/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '~core/Button';
import Icon from '~core/Icon';
import Link from '~core/Link';
import Popover from '~core/Popover';
import Search from '~core/Search';

import DocsDropdown from '~layouts/DeveloperPortalLayout/DocsDropdown';

import styles from './Header.module.css';

const MSG = defineMessages({
  imageAltDevPortal: {
    id: 'layouts.DeveloperPortalLayout.Header.imageAltDevPortal',
    defaultMessage: 'Colony Developer Portal',
  },
  navLinkDocs: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkDocs',
    defaultMessage: 'Docs',
  },
  navLinkTutorials: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkTutorials',
    defaultMessage: 'Tutorials',
  },
  navLinkSupport: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkSupport',
    defaultMessage: 'Support',
  },
});

const displayName = 'layouts.DeveloperPortalLayout.Header';

const Header = () => (
  <div className={styles.main}>
    <div className={styles.menuWrapper}>
      <Link href="/developers">
        <Icon
          className={styles.logo}
          name="developerPortal_white"
          title={MSG.imageAltDevPortal}
          viewBox="0 0 134 33"
        />
      </Link>
      <div className={styles.navContainer}>
        <nav
          className={styles.navigation}
          role="navigation"
          aria-label="Main Navigation"
        >
          <span className={`${styles.navLink} ${styles.docsDropdownParent}`}>
            <Button appearance={{ theme: 'reset' }}>
              <Popover
                appearance={{ theme: 'grey' }}
                content={() => <DocsDropdown />}
                /*
                 * `isOpen` is always true for a11y purposes. This ensures the dropdown
                 * menu is always in the DOM, and visibility is controlled via CSS.
                 */
                isOpen
                placement="bottom-end"
                popperProps={{
                  modifiers: {
                    offset: {
                      offset: '140px',
                    },
                  },
                }}
                trigger="disabled"
                wrapperClassName={styles.docsDropdownContainer}
              >
                <div className={styles.dropdownParent} aria-haspopup="true">
                  <FormattedMessage {...MSG.navLinkDocs} />
                </div>
              </Popover>
            </Button>
          </span>
          <Link className={styles.navLink} href="/tutorials">
            <FormattedMessage {...MSG.navLinkTutorials} />
          </Link>
          <Link
            className={styles.navLink}
            href="/support"
            text={MSG.navLinkSupport}
          />
        </nav>
        <div className={styles.searchContainer}>
          <Search appearance={{ theme: 'light', type: 'quickSearch' }} />
        </div>
      </div>
    </div>
  </div>
);

Header.displayName = displayName;

export default Header;
