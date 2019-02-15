const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')

const utils = require('./scripts/utils');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

const langs = ['en'];
const defaultLangKey = 'en';
const prefixDefaultLangKey = false;

const sourcePlugins = {
  development: [
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
        name: 'colonyJS',
        path: path.resolve(__dirname, '..', 'colonyJS', 'docs'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'colonyStarter',
        path: path.resolve(__dirname, '..', 'colonyStarter', 'docs'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'purser',
        path: path.resolve(__dirname, '..', 'purser', 'docs'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'tailor',
        path: path.resolve(__dirname, '..', 'tailor', 'docs'),
      },
    },
  ],
  production: [{
    resolve: 'gatsby-source-github-docs',
    options: {
      githubAccessToken: process.env.DOCS_GITHUB_TOKEN,
      projects: [
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
        {
          owner: 'JoinColony',
          repo: 'purser',
          expression: 'master:docs/',
          name: 'purser',
        },
        {
          owner: 'JoinColony',
          repo: 'tailor',
          expression: 'master:docs/',
          name: 'tailor',
        },
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
        slugPrefix: 'docs',
        langConfig: {
          langs,
          defaultLangKey,
          prefixDefaultLangKey,
        }
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
            },
          },
          'gatsby-remark-autolink-headers',
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
