const { Service } = require('egg');
const bcrypt = require('bcryptjs'); // 引入 bcrypt 库

class UserService extends Service {
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
}
module.exports = UserService;
