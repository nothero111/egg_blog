// 在 app/extend/context.js 文件中定义扩展方法
module.exports = {
  success(data) {
    this.body = {
      code: 200,
      message: 'success',
      data,
    };
  },
  error(code, message) {
    this.body = {
      code,
      message,
    };
  },
};
