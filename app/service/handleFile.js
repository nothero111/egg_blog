const { Service } = require('egg');
const fs = require('fs').promises;
const path = require('path');
class UploadService extends Service {
    // 上传图片分装
    async upload(handle, file) {
        const fileHashNamelist = file.filepath.split('\\'); // 把文件目录切成数组
        const filepath = file.filepath; // 得到文件的绝对目录
        const fileName = fileHashNamelist[fileHashNamelist.length - 1]; // 获取文件名
        // 通过传入不同的handle值来判断是上传图片到图库（upload），还是上传封面（cover），还是用户头像（avatar）
        // eggjs本身并没有处理
        const fileHashName = fileHashNamelist[fileHashNamelist.length - 1];
        // 更改名字的同时如果修改目录，则文件会在相应位置新建
        await fs.rename(filepath,
            './app/public/' + handle + '/' + fileHashName);
        return fileName
    }
    // 删除图片
    async Delete(pathPic){
        const { config, ctx } = this;
        // 异步删除（推荐）
            const filePath = path.join(config.baseDir, 'app/public', pathPic);
        console.log(filePath)
            try {
                await fs.unlink(filePath);
                ctx.body = { success: true };
            } catch (err) {
                ctx.status = 500;
                ctx.body = { error: '删除失败', details: err.message };
            }
    }
}
module.exports = UploadService;
