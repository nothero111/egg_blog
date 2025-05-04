// 验证jwt
module.exports = (option = { required: true }) => {
  return async function auth(ctx, next) {
    let token = ctx.request.header.authorization;
    token = token ? token.split('Bearer ')[1] : null;
    if (token) {
      try {
        const data = ctx.service.user.verifyToken(token);
        ctx.user = data.user;

      } catch (e) {
        ctx.throw(401, 'token无效', e);
      }
    } else if (!option.required) {
      await next();
    } else {
      ctx.throw(401, 'token未传入');
    }
    await next();
  };
};
