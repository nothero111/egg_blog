const Controller = require('egg').Controller;


class UserController extends Controller {
  async create() {
    const { ctx, service } = this;
    const { password } = ctx.request.body;
    const user = ctx.request.body;
    if (!user) {
      ctx.throw(422, '用户信息不能为空');
    }
    // 验证请求参数
    await ctx.validate({
      name: { type: 'string', required: true }, // 用户名
      password: { type: 'string', required: true, min: 6, max: 11 }, // 用户密码
      email: { required: true, type: 'email' }, // 邮箱
      introduce: { type: 'string', required: false }, // 自我介绍
      level: { type: 'enum', values: [ 'normal' ], required: true }, // 用户权限
    }, user);
    // 加密密码
    user.password = await service.user.encryptPassword(password);
    // 如果用户上传头像，则进行相应存储
    if (ctx.request.files) {
      const file = ctx.request.files[0]; // 获取文件对象
      // 调用service的upload上传图片
      user.avatar = await service.handleFile.upload('avatar', file);
    }
    // 存储用户
    await service.user.addUser(user);
    // 返回用户信息
    ctx.success({
      code: 200,
      message: '用户注册成功',
    });
  }
  // 登录后台管理单页面
  async login() {
    const userBody = this.ctx.request.body;
    this.ctx.validate({
      email: { type: 'string', required: true },
      password: { type: 'string', required: true },
    }, userBody);
    const user = await this.service.user.findEmail(userBody.email);
    if (!user) {
      this.ctx.throw(422, '用户不存在');
    }
    if (!await this.service.user.verifyPassword(userBody.password, user.password)) { // 密码验证
      this.ctx.throw(422, '密码错误');

    }
    // 生成token,返回给前端
    const token = this.service.user.createToken({ user });
    const userinfo = user._doc;
    delete userinfo.password;
    this.ctx.body = {
      code: 0,
      userinfo: {
        ...userinfo,
      },
      token,
    };
  }
}
module.exports = UserController;
