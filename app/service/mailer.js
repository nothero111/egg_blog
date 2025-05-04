const nodemailer = require('nodemailer');
const Service = require('egg').Service;

class MailerService extends Service {
  async sendMail({ to, subject, text, html }) {
    const { config } = this;
    const transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      secure: config.mailer.secure,
      auth: {
        user: config.mailer.auth.user,
        pass: config.mailer.auth.pass,
      },
    });
    console.log(to);
    const mailOptions = {
      from: config.mailer.auth.user,
      to,
      subject,
      text,
      html,
    };

    try {
      return await transporter.sendMail(mailOptions);
    } catch (error) {
      this.ctx.logger.error(`邮件发送失败: ${error.message}`);
      throw error;
    }
  }
}

module.exports = MailerService;
