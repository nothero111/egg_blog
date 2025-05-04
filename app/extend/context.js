// 在 app/extend/context.js 文件中定义扩展方法
module.exports = {
  success(data) {
    this.status = 200;
    this.body = {
      message: 'success',
      data,
    };
  },
  error(code, message) {
    this.status = code;
    this.body = {
      message,
    };
  },
};
