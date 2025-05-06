/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 定义一个认证模块，防止没有管理员权限去修改相关信息
  const auth = app.middleware.auth();
  router.prefix('/api');
  // 用户操作
  router.post('/user/register', controller.user.create); // 注册
  router.post('/user/login', controller.user.login); // 登录
  router.post('/send-email', controller.email.send); // 发送邮件(暂时第一版不会上线这个功能，但要保留一部分功能以便于未来实现)
  // 文章操作
  router.post('/articledbs/add', auth, controller.articledbs.addArticle); // 添加文章
  router.patch('/articledbs/editArticle/:articleId', auth, controller.articledbs.editArticle); // 修改文章
  router.get('/articledbs/getArticle/:number', controller.articledbs.getAllArticle); // 获取所有文章,并不需要相关权限
};
