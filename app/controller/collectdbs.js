const { Controller } = require('egg');
const dayjs = require('dayjs');
class CollectdbsModel extends Controller {
  // 查
  async list() {
    const { ctx, service, config } = this;
    try {
      const result = await service.collectdbs.list();
      ctx.success(result);
    } catch (error) {
      ctx.error({
        code: config.CODE.DEFAULT.DEMO,
        message: error,
      });
    }
  }
  // 更新
  async update() {
    const { ctx, service, config } = this;
    const _id = ctx.request.body?._id;
    const collectName = ctx.request.body?.collectName;
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const params = {
      _id,
      collectName,
      fileUpdateAt: updateTime,
    };
    try {
      const result = await service.collectdbs.update(params);
      ctx.success(result);
    } catch (error) {
      ctx.error({
        code: config.CODE.DEFAULT.DEMO,
        message: error,
      });
    }
  }
  // 删除
  async delete() {
    const { ctx, service, config } = this;

    const _id = ctx.request.body?._id;

    try {
      await service.collectdbs.delete({ _id });
      ctx.success({});
    } catch (error) {
      ctx.error({
        code: config.CODE.DEFAULT.DEMO,
        message: error,
      });
    }
  }
  // 创建
  async create() {
    const { ctx, service, config } = this;
    const { collectName, fileName, account, fileUrl, filePath } = ctx.request.body;
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const params = {
      collectName, fileName, account, fileUrl, filePath, fileCreateAt: updateTime, fileUpdateAt: updateTime,
    };
    try {
      const result = await service.collectdbs.create(params);
      ctx.success(result);
    } catch (error) {
      ctx.error({
        code: config.CODE.DEFAULT.DEMO,
        message: error,
      });
    }
  }

}
module.exports = CollectdbsModel;
