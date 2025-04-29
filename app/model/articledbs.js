module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticledbsSchema = new Schema({
    title: { type: String }, // 标题
    name: { type: String }, // 作者名
    content: { type: String }, // 内容
    date: { type: String }, // 时间
    cover: { type: String }, // 封面
  });

  return mongoose.model('Articledbs', ArticledbsSchema, 'articledbs');
};
