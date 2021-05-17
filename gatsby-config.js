const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const i18nConfig = require('./i18nConfig');
const utils = require('./scripts/utils');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { CONFIGURED_LOCALES, DEFAULT_LOCALE } = i18nConfig;

const defaultLangKey = DEFAULT_LOCALE;
const prefixDefaultLangKey = false;

const sourcePlugins = {
  development: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'colonyNetwork',
        path: path.resolve(__dirname, '..', 'colonyNetwork', 'docs'),
        ignore: ['**/templates/*'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'tailor',
        path: path.resolve(__dirname, '..', 'tailor', 'docs'),
        ignore: ['**/templates/*'],
      },
    },
  ],
  production: [
    {
      resolve: 'gatsby-source-github-docs',
      options: {
        githubAccessToken: process.env.DOCS_GITHUB_TOKEN,
        projects: [
          {
            owner: 'JoinColony',
            repo: 'colonyNetwork',
            expression: 'master:docs/',
            name: 'colonyNetwork',
          },
          {
            owner: 'JoinColony',
            repo: 'tailor',
            expression: 'master:docs/',
            name: 'tailor',
          },
        ],
      },
    },
  ],
};

module.exports = {
  siteMetadata: {
    siteUrl: `https://colony.io`,
    title: 'Colony: A platform for open organizations',
    externalDocs: [
      {
        entryPoint: 'https://joincolony.github.io/colonyJS',
        logo: '/img/logomark_colonyJS_color.svg',
        logoSmall: '/img/logomark_colonyJS_red.svg',
        name: 'colonyJS',
        repoUrl: 'https://github.com/JoinColony/colonyJS',
        type: 'core',
      },
      {
        entryPoint: 'https://joincolony.github.io/purser',
        logo: '/img/purser_color.svg',
        logoSmall: '/img/logomark_purser_green.svg',
        name: 'purser',
        repoUrl: 'https://github.com/JoinColony/purser',
        type: 'tool',
      }
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: defaultLangKey,
        useLangKeyLayout: false,
        prefixDefault: prefixDefaultLangKey,
      },
    },
    'gatsby-plugin-react-helmet',
    ...sourcePlugins[process.env.NODE_ENV],
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-transform-md-docs',
      options: {
        langConfig: {
          langs: CONFIGURED_LOCALES,
          defaultLangKey,
          prefixDefaultLangKey,
        },
        projects: [
          'colonyNetwork',
          'tailor',
        ],
        slugPrefix: 'dev/docs',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-toc',
            options: {
              placeholder: '==TOC==',
              className: 'md-toc',
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              className: 'md-heading-link',
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: 'https://blog.colony.io',
        contentApiKey: process.env.GHOST_CONTENT_API_KEY,
      },
    },
    'gatsby-plugin-flow',
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: utils.getModuleAliases(),
        extensions: [],
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GOOGLE_ANALYTICS_TRACKING_ID,

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        dataLayerName: "dataLayer",

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        // routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",
      },
    },
  ],
};
