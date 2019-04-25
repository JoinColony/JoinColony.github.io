# The Colony Website

This project was built with [Gatsby](https://www.gatsbyjs.org/).

## Installation, Run Development Server, and Deploy

#### Install dependencies

```sh
yarn
```

#### Lint & Flow Checks

```sh
yarn lint
yarn flow
```

#### Run Local Dev Server

```sh
yarn dev
```

This will start a local development server on port `8000`.

- Website: `http://localhost:8000/`
- GraphiQL: `http://localhost:8000/___graphql`

#### Building & Deploying

Running `deploy` will deploy this project to github pages (if configured to do so).

```sh
yarn build
yarn deploy
```

---

## Development

- [Intro](#intro)
- [Internationalization](#i18n)
  - [How it Works](#how-it-works)
  - [Writing Markdown Docs in Alternate Languages](#writing-markdown)
    - [Project Config](#project-config)
    - [Frontmatter](#frontmatter)
    - [Linking To Other Doc Pages](#linking-docs)
  - [Configuring Locales](#configuration)

<h3 id="intro">Intro</h3>

Because content for this website is sourced both locally within the project and externally (such as GitHub for docs pages), there are a few moving parts to keep in mind.

<h2 id="i18n">Internationalization</h2>

<h3 id="how-it-works">How it Works</h3>

- Locales are accessed via subdirectories with gTLD (see the section titled "**Using locale-specific URLs**" in [this article](https://support.google.com/webmasters/answer/182192?hl=en#) published by Google's Search Console team).
  - For example: `/es/` or `/fr/`
  - The default locale is english (`en`). If no locale is provided, the default will be used.

<h3 id="writing-markdown">Writing Markdown Docs in Alternate Languages</h3>

<h4 id="project-config">Project Config</h4>

The project config is a `json` file which contains certain attributes & meta data about a project, such as logo files, project description, section order, etc. Each project's `docs` directory must contain one, or the project's docs will be skipped when the docs are sourced.

There are two optional (but highly recommended) project configurations possible regarding translations:

- Translated Section Order
- Translated Description

Let's break these down...

#### Translated Section Order

By using translated section names in [doc frontmatter](#frontmatter), the section names will already be translated. **However the translated section names must still be ordered**. This is achieved with a map-like object. The locale is the key, and the value is an array of translated section names **in order**:

```javascript
// doc.config.json

{
    "sectionOrder": ["Docs", "Interface", "Modules"], // <-- Default language section order
    "sectionTranslations": {
        "es": ["Docs", "Interfaz", "Modulós"] // <-- Section order for `es` locale
    }
}
```

#### Translated Description

Similar to the Translated Section Order above, the project description must also be translated, and is done so with a map-like object. The locale is the key, and the value is the translated string:

```javascript
// doc.config.json

{
    "description": "The purser library is a...", // <-- Default language project description
    "descriptionTranslations": {
        "es": "La biblioteca de Purser es una..." // <-- Project description for `es` locale
    }
}
```

<h4 id="frontmatter">Frontmatter</h4>

- Project documentation written in other locales must be labelled with the appropriate `locale` frontmatter, and this `locale` **must** match one of the configured locales for the website.
  - If the doc's `locale` is one that the website is not yet configured with, it will be skipped when the docs are sourced.
  - If a doc in an alternate language is missing the `locale` frontmatter, it will be sourced and placed directly along-side the default (in this case, english) docs.

Here's an example frontmatter for a `purser` doc page configured for `es` locale:

```markdown
---
title: Visión General
section: Docs
order: 0
locale: es
---

... Doc content ...

```

The resulting slug for the above example would be `/es/${docsSlugPrefix}/purser/docs-vision-general`

<h4 id="linking-docs">Linking To Other Doc Pages</h4>

Doc pages often link to each other, or to doc pages in other projects. Sometimes, other projects (or other doc pages within the same project, even) may not have the same language support. So the path to the related doc page should be locale-explicit when using an alternate language.

Here are the two ways links can be written in markdown docs:
- Link to doc in default locale: `/${slugifiedProjectName}/${slugifiedSection}-${slugifiedTitle}/`
- Link to doc in alternate locale: `/${locale}/${slugifiedProjectName}/${slugifiedSection}-${slugifiedTitle}/`

#### Here's a possible example with a `purser` doc page:

##### Frontmatter of Doc We Want to Link To

```markdown
---
title: Interfaz de la Billetera Común
section: Interfaz
order: 0
locale: es
---
```

##### Link to Above Doc ☝️ 
```markdown
[La Interfaz de la billetera común](/es/purser/interfaz-interfaz-de-la-billetera-comun/)
```

> ##### Note: When the `DocPage` template renders this, the links will be parsed and the parser will know to rewrite the url with the `docsSlugPrefix` injected. So the resulting path will be ``/es/${docsSlugPrefix}/purser/interfaz-interfaz-de-la-billetera-comun/``.


<h3 id="configuration">Configuring Locales</h3>

Trying to access a locale that isn't configured will result in a 404 response, even if doc pages are written for said locale. To enable a particular locale for the entire website, a few things need to happen:

1. [Tell Gatsby About the New Locale](#configure-tell-gatsby)
2. [Configure `react-intl` to Use New Locale](#configure-react-intl)
3. [Add Locale-specific Versions of Gatsby `pages`](#configure-add-locale-versions)

<h5 id="configure-tell-gatsby">1. Tell Gatsby About the New Locale</h5>

Update the `CONFIGURED_LOCALES` array in `i18nConfig` to contain the new locale.

This tells both `gatsby-plugin-i18n` and `gatsby-transform-md-docs` about the new locale, and allows routing & doc page creation (for any docs with that specified locale in their frontmatter).

<h5 id="configure-react-intl">2. Configure `react-intl` to Use New Locale</h5>

Add a `LocaleConfig` object to the `localeMessages` object in `/src/modules/layouts/GlobalLayout/GlobalLayout.jsx`.

Create a messages file and import it, along with the correct language data set from `react-intl` and provide those to the config object.

Here's an example with both `en` and `es`:

```javascript
// GlobalLayout.jsx

import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';

import enMessages from '~i18n/en.json';
import esMessages from '~i18n/es.json';

const localeMessages: LocaleConfigs = {
  en: {
    messages: enMessages,
    data: enLocaleData,
  },
  es: {
    messages: esMessages,
    data: esLocaleData,
  },
};
```

This configures the locale data for the `IntlProvider`, and helps set the locale from the url.

<h5 id="configure-add-locale-versions">3. Add Locale-specific Versions of Gatsby `pages`</h5>

For each page (found in `/src/pages/`), add a locale-specific version. This can simply export the same component as the default locale version - it's just required because of `gatsby-plugin-i18n`'s convention is such.

For example:

```
\_ pages
  \_ index.js <-- This is the default version
  \_ index.es.js <-- This is the `es` version
```
