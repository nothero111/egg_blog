// app/middleware/error_handler.js
module.exports = () => { // 创建的一个捕捉错误的中间件
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 定义一个message用来传递错误信息
      let message;
      let status;
      // 所有的异常都会触发 app 上的一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);
      // 说明是传递的参数有问题
      if (err.code === 'invalid_param') {
        message = err.errors[0].field + ' ' + err.errors[0].message;
        status = 400;
      } else {
        // 如果没有传递参数的问题，则保持默认报错
        status = err.status || 500;
        // 在生产环境中，500 错误的详细内容不返回给客户端，因为可能含有敏感信息
        message =
            status === 500 && ctx.app.config.env === 'prod'
              ? 'Internal Server Error'
              : err.message;
      }

      if (status === 400) {
        ctx.body = {
          message,
        };
      }
      ctx.status = status;
    }
  };
};
