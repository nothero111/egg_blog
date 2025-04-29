/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 文章操作
  router.post('/articledbs/add', controller.articledbs.addArticle);
};
