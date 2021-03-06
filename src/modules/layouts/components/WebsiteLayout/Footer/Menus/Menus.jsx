/* @flow */

import React, { useState, useEffect } from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import VerticalMenu from '~core/VerticalMenu';
import {
  COLONY_BLOG,
  COLONY_DISCOURSE_SUPPORT,
  COLONY_GITHUB_BUDGETBOX,
  PAGE_ABOUT_COLONY_NETWORK,
  PAGE_ABOUT_METACOLONY,
  PAGE_ABOUT_VISION,
  PAGE_PRODUCT_APP,
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
  linkBlog: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkBlog',
    defaultMessage: 'Blog',
  },
  linkApp: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkApp',
    defaultMessage: 'App',
  },
  linkPlatform: {
    id: 'layouts.WebsiteLayout.Footer.Menus.linkPlatform',
    defaultMessage: 'Platform',
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
              href: PAGE_PRODUCT_APP,
              text: MSG.linkApp,
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
              href: COLONY_BLOG,
              text: MSG.linkBlog,
            },
            {
              className: styles.footerMenuLink,
              href: COLONY_GITHUB_BUDGETBOX,
              text: 'BudgetBox',
            },
            {
              className: styles.footerMenuLink,
              // Use full path here so `Link` knows it shouldn't be treated as a SPA route
              href: `${baseUri}${withPrefix('/whitepaper.pdf')}`,
              text: MSG.linkWhitePaper,
            },
            // @TODO add once media kit exists
            // {
            //   className: styles.footerMenuLink,
            //   href: PAGE_MEDIA_KIT,
            //   text: MSG.linkMediaKit,
            // },
          ]}
        />
      </div>
    </div>
  );
};

Menus.displayName = displayName;

export default Menus;
