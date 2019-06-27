/* @flow */

import type { WalletObjectType } from '@colony/purser-core';
import type { IntlShape } from 'react-intl';

import React, { useState } from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

import type { Network, Project, User } from '~types';

import Button from '~core/Button';
import Icon from '~core/Icon';
import Link from '~core/Link';
import NavigationToggle from '~core/NavigationToggle';
import Popover from '~core/Popover';
import Search from '~core/Search';
import DocsDropdownContent from '~layouts/DeveloperPortalLayout/DocsDropdownContent';
import {
  COLONY_DISCOURSE_SUPPORT,
  PAGE_DEVELOPER_PORTAL_INDEX,
  PAGE_DEVELOPER_PORTAL_CONTRIBUTE,
  PAGE_DEVELOPER_PORTAL_DASHBOARD,
} from '~routes';

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
  network: ?Network,
  openSourceProjects: Array<Project>,
  pathDashboard: boolean,
  user: ?User,
  wallet: ?WalletObjectType,
|};

const displayName = 'layouts.DeveloperPortalLayout.Header';

const Header = ({
  coreProjects,
  intl: { formatMessage },
  intl,
  network,
  openSourceProjects,
  pathDashboard,
  user,
  wallet,
}: Props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navAriaLabel = formatMessage(MSG.navAriaLabel);
  return (
    <div className={styles.main}>
      <div className={styles.menuWrapper}>
        <div className={styles.leftWrapper}>
          <Link href={PAGE_DEVELOPER_PORTAL_INDEX}>
            <Icon
              className={styles.logo}
              name="developerPortal_white"
              title={MSG.imageAltDevPortal}
              viewBox="0 0 134 33"
            />
          </Link>
          {network && wallet && (
            <div className={styles.network}>
              <div
                className={styles.networkDot}
                style={{ borderColor: network.color }}
              />
              {network.name}
            </div>
          )}
        </div>
        <div aria-expanded={isNavOpen} className={styles.navContainer}>
          <nav
            className={styles.navigation}
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
              href={PAGE_DEVELOPER_PORTAL_CONTRIBUTE}
              text={MSG.navLinkContribute}
            />
            <Link
              className={styles.navLink}
              href={COLONY_DISCOURSE_SUPPORT}
              text={MSG.navLinkSupport}
            />
          </nav>
          <div className={styles.searchContainer}>
            <Search
              appearance={{ theme: 'light', type: 'quickSearch' }}
              inputId="devPortalLayoutHeaderSearch"
            />
          </div>
          <Button
            appearance={{
              theme: pathDashboard ? 'primary' : 'primaryHollow',
              color: pathDashboard ? 'white' : undefined,
              hover: 'disablePrimary',
              padding: 'large',
              size: 'medium',
            }}
            className={styles.dashboardButton}
            linkTo={PAGE_DEVELOPER_PORTAL_DASHBOARD}
            text={wallet && user ? MSG.navButtonDashboard : MSG.navButtonLogin}
          />
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
