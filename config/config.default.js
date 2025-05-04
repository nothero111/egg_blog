/* eslint valid-jsdoc: "off" */

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
  config.keys = appInfo.name + '_1745838372330_9064';
  config.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/myBlog_egg',
      options: {
        useUnifiedTopology: true,
      },
    },

  };
  config.multipart = {
    mode: 'file',
    fileSize: '50mb',
    whitelist: [ '.jpg', '.png', '.gif' ],
    tmpDir: 'app/public/tmp', // 临时目录（需手动创建）
    cleanSchedule: { // 定时清理策略
      cron: '0 30 4 * * *', // 每天4:30清理
      disable: false,
    },
  };
  // EGG 安全配置
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };
  config.mailer = {
    host: 'smtp.qq.com', // SMTP服务器地址
    port: 465, // 端口号
    secure: true, // 使用SSL
    auth: {
      user: '3599545378@qq.com', // 发件人邮箱
      pass: 'fsfmlvsejmwgdbbj', // 邮箱授权码
    },
  };
  // add your middleware config here
  config.middleware = [ 'errorHandler' ];
  config.multipart = {
    mode: 'file',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
