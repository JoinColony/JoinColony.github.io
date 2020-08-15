/* @flow */

import type { IntlShape } from 'react-intl';

import React, { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

import type { Project } from '~types';

import Button from '~core/Button';
import Icon from '~core/Icon';
import Link from '~core/Link';
import NavigationToggle from '~core/NavigationToggle';
import Popover from '~core/Popover';
import Search from '~core/Search';
import DocsDropdownContent from '~layouts/DeveloperPortalLayout/DocsDropdownContent';
import { COLONY_DISCOURSE_SUPPORT, PAGE_INDEX } from '~routes';

import styles from './Header.module.css';

const MSG = defineMessages({
  imageAltDevPortal: {
    id: 'layouts.DeveloperPortalLayout.Header.imageAltDevPortal',
    defaultMessage: 'Colony Developer Portal',
  },
  navAriaLabel: {
    id: 'layouts.DeveloperPortalLayout.Header.navAriaLabel',
    defaultMessage: 'Main Navigation',
  },
  navLinkContribute: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkContribute',
    defaultMessage: 'Contribute',
  },
  navLinkDocs: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkDocs',
    defaultMessage: 'Docs',
  },
  navLinkSupport: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkSupport',
    defaultMessage: 'Support',
  },
  navButtonLogin: {
    id: 'layouts.DeveloperPortalLayout.Header.navButtonLogin',
    defaultMessage: 'Login',
  },
  navButtonDashboard: {
    id: 'layouts.DeveloperPortalLayout.Header.navButtonDashboard',
    defaultMessage: 'Dashboard',
  },
});

type Props = {|
  coreProjects: Array<Project>,
  intl: IntlShape,
  openSourceProjects: Array<Project>,
|};

const displayName = 'layouts.DeveloperPortalLayout.Header';

const Header = ({
  coreProjects,
  intl: { formatMessage },
  intl,
  openSourceProjects,
}: Props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navigationStyle, setNavigationStyle] = useState('navigation');
  const navAriaLabel = formatMessage(MSG.navAriaLabel);
  const searchInputId = 'devPortalLayoutHeaderSearch';
  const handleOpenSearch = () => {
    setNavigationStyle('navigationHidden');
  };
  const handleCloseSearch = () => {
    setNavigationStyle('navigationAnimated');
  };
  useEffect(() => {
    const searchInput = document.getElementById(searchInputId);
    if (searchInput) {
      searchInput.addEventListener('focus', handleOpenSearch);
      searchInput.addEventListener('blur', handleCloseSearch);
    }
    return () => {
      if (searchInput) {
        searchInput.removeEventListener('focus', handleOpenSearch);
        searchInput.removeEventListener('blur', handleCloseSearch);
      }
    };
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.menuWrapper}>
        <div className={styles.leftWrapper}>
          <Link href={PAGE_INDEX}>
            <Icon
              className={styles.logo}
              name="developerPortal_white"
              title={MSG.imageAltDevPortal}
              viewBox="0 0 134 33"
            />
          </Link>
        </div>
        <div aria-expanded={isNavOpen} className={styles.navContainer}>
          <nav
            className={styles[navigationStyle]}
            role="navigation"
            aria-label={navAriaLabel}
          >
            <span className={`${styles.navLink} ${styles.docsDropdownParent}`}>
              <Button appearance={{ theme: 'reset' }}>
                <Popover
                  appearance={{ theme: 'grey' }}
                  content={() => (
                    <DocsDropdownContent
                      coreProjects={coreProjects}
                      intl={intl}
                      openSourceProjects={openSourceProjects}
                    />
                  )}
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
              <div className={styles.mobileDocsDropdown}>
                <DocsDropdownContent
                  coreProjects={coreProjects}
                  intl={intl}
                  openSourceProjects={openSourceProjects}
                />
              </div>
            </span>
            <Link
              className={styles.navLink}
              href={COLONY_DISCOURSE_SUPPORT}
              text={MSG.navLinkSupport}
            />
          </nav>
          <div className={styles.searchContainer}>
            <Search
              appearance={{ theme: 'light', type: 'quickSearch' }}
              inputId={searchInputId}
            />
          </div>
        </div>
        <div className={styles.navToggle}>
          <NavigationToggle
            appearance={{ hideAtSize: 'medium', theme: 'light' }}
            isNavOpen={isNavOpen}
            onClick={() => setIsNavOpen(!isNavOpen)}
          />
        </div>
      </div>
    </div>
  );
};

Header.displayName = displayName;

export default injectIntl(Header);
