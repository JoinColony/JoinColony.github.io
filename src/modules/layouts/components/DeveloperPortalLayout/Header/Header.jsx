/* @flow */
import React, { Component } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Icon from '~core/Icon';
import Link from '~core/Link';
import Popover from '~core/Popover';

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

type Props = {};

type State = {
  isDocsOpen: boolean,
};

class Header extends Component<Props, State> {
  static displayName = 'layouts.DeveloperPortalLayout.Header';

  state = {
    isDocsOpen: false,
  };

  closeDocsDropdown = () => {
    this.setState({
      isDocsOpen: false,
    });
  };

  openDocsDropdown = () => {
    this.setState({
      isDocsOpen: true,
    });
  };

  render() {
    const { isDocsOpen } = this.state;
    return (
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
              <span
                className={styles.navLink}
                onMouseLeave={this.closeDocsDropdown}
              >
                <Popover
                  content={() => <span>Render prop content</span>}
                  isOpen={isDocsOpen}
                  placement="bottom"
                  trigger="disabled"
                >
                  <div
                    className={styles.dropdownParent}
                    onMouseEnter={this.openDocsDropdown}
                  >
                    <FormattedMessage {...MSG.navLinkDocs} />
                  </div>
                </Popover>
              </span>
              <Link className={styles.navLink} href="/tutorials">
                <FormattedMessage {...MSG.navLinkTutorials} />
                {/* @TODO: dropdown nav here */}
              </Link>
              <Link
                className={styles.navLink}
                href="/support"
                text={MSG.navLinkSupport}
              />
            </nav>
            <div className={styles.searchContainer}>
              {/* @TODO: search component here */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
