/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户操作
  router.post('/user/register', controller.user.create); // 注册
  router.post('/user/login', controller.user.login); // 登录
  router.post('/send-email', controller.email.send); // 发送邮件(暂时第一版不会上线这个功能，但要保留一部分功能以便于未来实现)
  // 文章操作
  router.post('/articledbs/add', controller.articledbs.addArticle); // 添加文章
  router.patch('/articledbs/editArticle/:articleId', controller.articledbs.editArticle); // 修改文章
};
