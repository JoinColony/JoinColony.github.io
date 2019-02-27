/* @flow */
const fs = require('fs');
const path = require('path');

const { readdirSync } = fs;

const MODULES_FOLDER = 'modules';
const COMPONENTS_FOLDER = 'components';

const SITE_ROOT = path.resolve(__dirname, '..', 'src');
const SITE_MODULES = path.resolve(SITE_ROOT, MODULES_FOLDER);

const getSiteModules = (searchPath = SITE_MODULES) => {
  const siteModules = readdirSync(searchPath);
  return siteModules.filter(siteModule =>
    fs.existsSync(path.resolve(searchPath, siteModule, COMPONENTS_FOLDER)),
  );
};

const generateWebpackAlias = (moduleName, searchPath = SITE_MODULES) => ({
  [`~${moduleName}`]: path.resolve(searchPath, moduleName, COMPONENTS_FOLDER),
});

const generateModulesAliases = () => {
  let modulesAliases = {};
  const foundSiteModules = getSiteModules();
  foundSiteModules.forEach(siteModule => {
    modulesAliases = Object.assign(
      {},
      modulesAliases,
      generateWebpackAlias(siteModule),
    );
  });
  return modulesAliases;
};

// eslint-disable-next-line import/prefer-default-export
const getModuleAliases = () =>
  Object.assign(
    {},
    {
      '~context': path.resolve(SITE_ROOT, 'context'),
      '~hoc': path.resolve(SITE_ROOT, 'hoc'),
      '~i18n': path.resolve(SITE_ROOT, 'i18n'),
      '~i18nConfig': path.resolve(__dirname, '..', 'i18nConfig'),
      '~static': path.resolve(__dirname, '..', 'static'),
      '~styles': path.resolve(SITE_ROOT, 'styles'),
      '~types': path.resolve(SITE_ROOT, 'types'),
      '~utils': path.resolve(SITE_ROOT, 'utils'),
    },
    generateModulesAliases(),
  );

module.exports = {
  getModuleAliases,
};
