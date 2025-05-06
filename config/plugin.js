/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mongoose: {
    enable: true, // 开启插件
    package: 'egg-mongoose',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  multipart: {
    enable: true,
    package: 'egg-multipart',
  },
  // 跨域问题
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
