const { Service } = require('egg');
class ArticleService extends Service {
  // 封装一个get方法，以便于操作Article数据库
  get article() {
    return this.ctx.model.Articledbs;
  }
  // 新增一篇文章
  async create(params) {
    const article = new this.article(params);
    // 保存这个文档对象
    await article.save();
  }
  // 获取文章的全部信息
  async articleDetail(id) {
    return this.article.findById(id);
  }
  // 修改文章
  async editArticle(id, params) {
    return this.ctx.model.User.updateOne({ _id: id }, params);
  }
}
module.exports = ArticleService;
