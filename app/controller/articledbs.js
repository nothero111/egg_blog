const Controller = require('egg').Controller;


class ArticledbsController extends Controller {
  // 添加文章
  async addArticle() {
    const { ctx, service } = this;
    // 验证请求参数
    await ctx.validate({
      title: { type: 'string', required: true }, // 文章标题，必须为字符串
      name: { type: 'string', required: true }, // 文章作者，必须为字符串
      content: { type: 'string', required: true }, // 文章内容，必须为字符串数组
      date: { type: 'string', required: true }, // 文章日期，必须为字符串
      category: { type: 'enum', values: [ '小记', '生活', '代码', '数学', '算法', '其他' ], required: false }, // 定义上传的类型
    }, ctx.request.body);
    const article = ctx.request.body;
    // 调用service的upload上传图片
    if (ctx.request.files) {
      // 如果上传封面的话，否则用默认封面
      article.cover = await service.handleFile.upload('cover', ctx.request.files[0]);
    }
    // 保存
    await service.articledbs.create(article);
    ctx.success({
      code: 200,
      message: '添加成功',
    });
  }
  // 修改文章
  async editArticle() {
    const { ctx, service } = this;
    const articleId = ctx.params.articleId; // 获取文章id
    const update = ctx.request.body; // 获取修改的内容
    // 判断是否要修改封面
    if (ctx.request.files[0]) {
      // 调用service的upload上传图片
      const file = ctx.request.files[0];
      update.cover = await service.handleFile.upload('cover', file);
    }
    // 判断是否要修改除封面以外的内容
    if (update) { service.articledbs.editArticle(articleId, update); }
  }
  // 获取所有文章
  async getAllArticle() {
    const { ctx, service } = this;
    const number = ctx.params.number; // 一次请求获取文章数目
  }
  // 删除文章
  async deleteArticle() {
    const { service } = this;
    console.log(service.handleFile);
  }
}
module.exports = ArticledbsController;
