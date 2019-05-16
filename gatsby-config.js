const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')

const i18nConfig = require('./i18nConfig');
const utils = require('./scripts/utils');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

const { CONFIGURED_LOCALES, DEFAULT_LOCALE } = i18nConfig;

const defaultLangKey = DEFAULT_LOCALE;
const prefixDefaultLangKey = false;

const sourcePlugins = {
  development: [
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'budgetBox',
    //     path: path.resolve(__dirname, '..', 'budgetBox', 'docs'),
    //   },
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'colonyJS',
        path: path.resolve(__dirname, '..', 'colonyJS', 'docs'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'colonyNetwork',
        path: path.resolve(__dirname, '..', 'colonyNetwork', 'docs'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'colonyStarter',
        path: path.resolve(__dirname, '..', 'colonyStarter', 'docs'),
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'pinion',
    //     path: path.resolve(__dirname, '..', 'pinion', 'docs'),
    //   },
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'purser',
        path: path.resolve(__dirname, '..', 'purser', 'docs'),
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'solcover',
    //     path: path.resolve(__dirname, '..', 'solcover', 'docs'),
    //   },
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'tailor',
        path: path.resolve(__dirname, '..', 'tailor', 'docs'),
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'trufflepig',
    //     path: path.resolve(__dirname, '..', 'trufflepig', 'docs'),
    //   },
    // },
  ],
  production: [{
    resolve: 'gatsby-source-github-docs',
    options: {
      githubAccessToken: process.env.DOCS_GITHUB_TOKEN,
      projects: [
        // {
        //   owner: 'JoinColony',
        //   repo: 'budgetBox',
        //   expression: 'master:docs/',
        //   name: 'budgetBox',
        // },
        {
          owner: 'JoinColony',
          repo: 'colonyNetwork',
          expression: 'develop:docs/',
          name: 'colonyNetwork',
        },
        {
          owner: 'JoinColony',
          repo: 'colonyJS',
          expression: 'master:docs/',
          name: 'colonyJS',
        },
        {
          owner: 'JoinColony',
          repo: 'colonyStarter',
          expression: 'master:docs/',
          name: 'colonyStarter',
        },
        // {
        //   owner: 'JoinColony',
        //   repo: 'pinion',
        //   expression: 'master:docs/',
        //   name: 'pinion',
        // },
        {
          owner: 'JoinColony',
          repo: 'purser',
          expression: 'master:docs/',
          name: 'purser',
        },
        // {
        //   owner: 'JoinColony',
        //   repo: 'solcover',
        //   expression: 'master:docs/',
        //   name: 'solcover',
        // },
        {
          owner: 'JoinColony',
          repo: 'tailor',
          expression: 'master:docs/',
          name: 'tailor',
        },
        // {
        //   owner: 'JoinColony',
        //   repo: 'trufflepig',
        //   expression: 'master:docs/',
        //   name: 'trufflepig',
        // },
      ],
    },
  }],
}

module.exports = {
  siteMetadata: {
    siteUrl: `https://docs.colony.io`,
    title: 'Colony Open Source Docs',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: defaultLangKey,
        useLangKeyLayout: false,
        prefixDefault: prefixDefaultLangKey,
      }
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
        projects: ['colonyJS', 'colonyNetwork', 'colonyStarter', 'purser', 'tailor'],
      }
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
    'gatsby-plugin-flow',
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: utils.getModuleAliases(),
        extensions: []
      }
    },
  ],
}
