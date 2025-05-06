module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticledbsSchema = new Schema({
    title: { type: String, required: true }, // 标题
    name: { type: String, required: true }, // 作者名
    content: { type: String, required: true }, // 内容
    date: { type: String, required: true }, // 时间
    cover: { type: String, required: true, default: 'img.png' }, // 封面
    category: { type: String, required: false, default: '其他' }, // 分类
  });

  return mongoose.model('Articledbs', ArticledbsSchema, 'articledbs');
};
