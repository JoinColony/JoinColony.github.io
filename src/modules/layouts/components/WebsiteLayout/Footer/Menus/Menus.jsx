/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import VerticalMenu from '~core/VerticalMenu';

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

const Menus = () => (
  <>
    <VerticalMenu
      appearance={{ alignText: 'right', margins: 'large' }}
      headingAppearance={{ theme: 'dark' }}
      headingText={MSG.headingProducts}
      menuItems={[
        { className: styles.footerMenuLink, href: '/', text: MSG.linkDapp },
        { className: styles.footerMenuLink, href: '/', text: MSG.linkPlatform },
      ]}
    />
    <VerticalMenu
      appearance={{ alignText: 'right', margins: 'large' }}
      headingAppearance={{ theme: 'dark' }}
      headingText={MSG.headingDevelopers}
      menuItems={[
        { className: styles.footerMenuLink, href: '/', text: MSG.linkPortal },
        {
          className: styles.footerMenuLink,
          href: '/',
          text: MSG.linkTutorials,
        },
        { className: styles.footerMenuLink, href: '/', text: MSG.linkSupport },
      ]}
    />
    <VerticalMenu
      appearance={{ alignText: 'right', margins: 'large' }}
      headingAppearance={{ theme: 'dark' }}
      headingText={MSG.headingAbout}
      menuItems={[
        { className: styles.footerMenuLink, href: '/', text: MSG.linkVision },
        { className: styles.footerMenuLink, href: '/', text: 'colonyNetwork' },
        {
          className: styles.footerMenuLink,
          href: '/',
          text: MSG.linkMetaColony,
        },
      ]}
    />
    <VerticalMenu
      appearance={{ alignText: 'right', margins: 'large' }}
      headingAppearance={{ theme: 'dark' }}
      headingText={MSG.headingResources}
      menuItems={[
        { className: styles.footerMenuLink, href: '/', text: 'BudgetBox' },
        {
          className: styles.footerMenuLink,
          href: '/',
          text: MSG.linkWhitePaper,
        },
        { className: styles.footerMenuLink, href: '/', text: MSG.linkMediaKit },
      ]}
    />
  </>
);

Menus.displayName = displayName;

export default Menus;
