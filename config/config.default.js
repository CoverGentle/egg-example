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

  //
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 模板
  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  // 解决跨域问题
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD.PUT,POST,DELETE,PATCH',
  };

  // jwt鉴权
  config.jwt = {
    expire: 7200, // token过期时间
    secret: 'shuaibo.tang',
  };

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    database: 'management',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin.1234',
    timezone: '+08:00',
    define: {
      timestamps: true, // 自动写入时间戳 created_at updated_at
      paranoid: true, // 字段生成软删除时间戳 deleted_at
      underscored: true, // 全部驼峰命名格式化
    },
  };
  // 微信
  config.wechat = {
    appid: 'wxbdc937314035728b',
    appsecret: '451f142e89d06d38545769a2395a7804',
    Token: 'azsxdc1q2w3e4r',
  };

  return {
    ...config,
    ...userConfig,
  };
};
