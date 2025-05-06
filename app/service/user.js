const { Service } = require('egg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService extends Service {
  // 生成token
  createToken(data) {
    return jwt.sign(data, this.app.config.jwt.secret, { expiresIn:
      this.app.config.jwt.expiresIn });// 生成token

  }
  // 验证token
  verifyToken(token) {
    return jwt.verify(token, this.app.config.jwt.secret);
  }
  // 密码加密（自动处理盐值生成）
  async encryptPassword(rawPassword) {
    const saltRounds = 12; // 推荐值：10-12（性能与安全平衡）
    return await bcrypt.hash(rawPassword, saltRounds);
  }
  // 密码验证
  async verifyPassword(inputPassword, hashedPassword) {
    // 返回是一个true/false
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
  // 获取用户模型
  get User() {
    return this.ctx.model.Userdbs;
  }
  // 添加用户
  async addUser(user) {
    const article = new this.User(user);
    // 保存这个文档对象
    await article.save();
  }
  // 根据邮箱查找用户
  findEmail(email) {
    // 因为在mode里设置的password的字段默认是不会被查找返回的，所以要加一个select('+password')，强制返回password字段
    return this.User.findOne({ email }).select('+password');
    // 补充加上要寻找密码
  }
}
module.exports = UserService;
