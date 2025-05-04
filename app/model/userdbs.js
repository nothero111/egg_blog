module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserdbsSchema = new Schema({
    name: { type: String, required: true }, // 用户名
    password: { type: String, required: true }, // 密码
    email: { type: String, required: true }, // 邮箱（用邮箱作为用户账号）
    introduce: { type: String, required: false, default: '该用户很懒，还没有自我介绍' }, // 介绍
    avatar: { type: String, required: false, default: 'avatar.jpg' }, // 头像
    level: { type: String, required: false, default: 'normal' }, // 用户等级
  });
  return mongoose.model('Userdbs', UserdbsSchema, 'userdbs');
};
