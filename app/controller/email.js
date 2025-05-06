// 自动发送邮件
const Controller = require('egg').Controller;

class EmailController extends Controller {
  async send() {
    const { ctx, service } = this;
    const { username, phone, email, company, product, description } = ctx.request.body;
    // 构建邮件内容
    const htmlContent = `
      <h3>产品咨询</h3>
      <p><b>姓名：</b> ${username}</p>
      <p><b>电话：</b> ${phone}</p>
      <p><b>邮箱：</b> ${email}</p>
      <p><b>公司：</b> ${company}</p>
      <p><b>产品名称：</b> ${product}</p>
      <p><b>需求描述：</b> ${description}</p>
    `;

    try {
      const info = await service.mailer.sendMail({
        to: email, // 多个收件人用逗号分隔
        subject: '产品咨询',
        text: '', // 可选，纯文本内容
        html: htmlContent, // HTML内容
      });
      ctx.body = {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }
}

module.exports = EmailController;
