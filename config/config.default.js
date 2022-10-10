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

  // 配置启动端口号
  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '127.0.0.1',
    },
  };

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

  // mysql数据库配置
  config.mysql = {
    // 单数据库配置
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'admin.1234',
      database: 'management',
    },
    app: true,
    agent: false,
  };
  // 微信
  config.wechat = {
    appid: 'wxbdc937314035728b',
    appsecret: '451f142e89d06d38545769a2395a7804',
    Token: '1qaz2wsx3edc',
  };
  // 配置redis
  config.redis = {
    clients: {
      accessToken: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 1,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
