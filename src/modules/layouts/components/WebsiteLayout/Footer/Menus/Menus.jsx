/* @flow */

import React, { useState, useEffect } from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import VerticalMenu from '~core/VerticalMenu';
import {
  COLONY_DISCOURSE_SUPPORT,
  COLONY_GITHUB_BUDGETBOX,
  PAGE_ABOUT_COLONY_NETWORK,
  PAGE_ABOUT_METACOLONY,
  PAGE_ABOUT_VISION,
  PAGE_DEV_DOCS,
  PAGE_DEV_TUTORIALS, // eslint-disable-line no-unused-vars
  PAGE_MEDIA_KIT,
  PAGE_PRODUCT_DAPP,
  PAGE_PRODUCT_PLATFORM,
} from '~routes';

import styles from './Menus.module.css';

const MSG = defineMessages({
  headingAbout: {
    id: 'layouts.WebsiteLayout.Footer.Menus.headingAbout',
    defaultMessage: 'About',
  },
  headingDevelopers: {
    id: 'layouts.WebsiteLayout.Footer.Menus.headingDevelopers',
    defaultMessage: 'Developers',
  },
  headingProducts: {
    id: 'layouts.WebsiteLayout.Footer.Menus.headingProducts',
    defaultMessage: 'Products',
  },
  headingResources: {
    id: 'layouts.WebsiteLayout.Footer.Menus.headingResources',
    defaultMessage: 'Resources',
  },
  linkDapp: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkDapp',
    defaultMessage: 'Dapp',
  },
  linkPlatform: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkPlatform',
    defaultMessage: 'Platform',
  },
  linkPortal: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkPortal',
    defaultMessage: 'Portal',
  },
  linkTutorials: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkTutorials',
    defaultMessage: 'Tutorials',
  },
  linkSupport: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkSupport',
    defaultMessage: 'Support',
  },
  linkVision: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkVision',
    defaultMessage: 'Vision',
  },
  linkMetaColony: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkMetaColony',
    defaultMessage: 'The Metacolony',
  },
  linkWhitePaper: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkWhitePaper',
    defaultMessage: 'White Paper',
  },
  linkMediaKit: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkMediaKit',
    defaultMessage: 'Media Kit',
  },
});

const displayName = 'layouts.WebsiteLayout.Footer.Menus';

const Menus = () => {
  const [baseUri, setBaseUri] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUri(window.location.origin);
    }
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <VerticalMenu
          appearance={{ margins: 'large' }}
          headingAppearance={{ theme: 'dark' }}
          headingText={MSG.headingProducts}
          menuItems={[
            {
              className: styles.footerMenuLink,
              href: PAGE_PRODUCT_DAPP,
              text: MSG.linkDapp,
            },
            {
              className: styles.footerMenuLink,
              href: PAGE_PRODUCT_PLATFORM,
              text: MSG.linkPlatform,
            },
          ]}
        />
      </div>
      <div className={styles.menu}>
        <VerticalMenu
          appearance={{ margins: 'large' }}
          headingAppearance={{ theme: 'dark' }}
          headingText={MSG.headingDevelopers}
          menuItems={[
            {
              className: styles.footerMenuLink,
              href: PAGE_DEV_DOCS,
              text: MSG.linkPortal,
            },
            // @TODO: add this back in when tutorials are implemented
            // {
            //   className: styles.footerMenuLink,
            //   href: PAGE_DEV_TUTORIALS,
            //   text: MSG.linkTutorials,
            // },
            {
              className: styles.footerMenuLink,
              href: COLONY_DISCOURSE_SUPPORT,
              text: MSG.linkSupport,
            },
          ]}
        />
      </div>
      <div className={styles.menu}>
        <VerticalMenu
          appearance={{ margins: 'large' }}
          headingAppearance={{ theme: 'dark' }}
          headingText={MSG.headingAbout}
          menuItems={[
            {
              className: styles.footerMenuLink,
              href: PAGE_ABOUT_VISION,
              text: MSG.linkVision,
            },
            {
              className: styles.footerMenuLink,
              href: PAGE_ABOUT_COLONY_NETWORK,
              text: 'colonyNetwork',
            },
            {
              className: styles.footerMenuLink,
              href: PAGE_ABOUT_METACOLONY,
              text: MSG.linkMetaColony,
            },
          ]}
        />
      </div>
      <div className={styles.menu}>
        <VerticalMenu
          appearance={{ margins: 'large' }}
          headingAppearance={{ theme: 'dark' }}
          headingText={MSG.headingResources}
          menuItems={[
            {
              className: styles.footerMenuLink,
              href: COLONY_GITHUB_BUDGETBOX,
              text: 'BudgetBox',
            },
            {
              className: styles.footerMenuLink,
              // Use full path here so `Link` knows it shouldn't be treated as a SPA route
              href: `${baseUri}${withPrefix('pdf/whitepaper.pdf')}`,
              text: MSG.linkWhitePaper,
            },
            {
              className: styles.footerMenuLink,
              href: PAGE_MEDIA_KIT,
              text: MSG.linkMediaKit,
            },
          ]}
        />
      </div>
    </div>
  );
};

Menus.displayName = displayName;

export default Menus;
