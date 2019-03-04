/* @flow */

const DEFAULT_LOCALE = 'en';

const CONFIGURED_LOCALES = [DEFAULT_LOCALE];

const langConfig = {
  langs: CONFIGURED_LOCALES,
  defaultLangKey: DEFAULT_LOCALE,
  prefixDefaultLangKey: false,
};

module.exports = {
  CONFIGURED_LOCALES,
  DEFAULT_LOCALE,
  langConfig,
};
