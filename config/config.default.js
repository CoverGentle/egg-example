/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1660722503922_3870';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.view = {
    defaultViewEngine: 'nunjucks',
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD.PUT,POST,DELETE,PATCH',
  };
  config.jwt = {
    secret: 'shuaibo.tang',
  };

  return {
    ...config,
    ...userConfig,
  };
};
