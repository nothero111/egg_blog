const Controller = require('egg').Controller;

class ArticledbsController extends Controller {
  // 添加文章
  async addArticle() {
    const { ctx, service } = this;
    try {
      // 保存
      await service.articledbs.create(ctx.request.body);
      ctx.body = {
        code: 200,
        message: '添加成功',
      };
    } catch (error) {
      // 打印错误日志
      console.log(error);
      // 返回错误信息
      ctx.error({
        code: 500,
        message: '添加失败',
      });
    }
  }
}
module.exports = ArticledbsController;
