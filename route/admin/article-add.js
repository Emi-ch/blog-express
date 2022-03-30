// 引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    // 创建表单解析对象
    const form = formidable({
        // 配置上传文件的存放位置
        uploadDir: path.join(__dirname, '../', '../', 'public', 'uploads'),
        // 保留上传文件后缀
        keepExtensions: true
    });

    // 解析表单
    form.parse(req, async(err, fields, files) => {
        // err 错误对象 如果表单解析失败 err存储错误信息 如果表单解析成功 err存储null
        // fields 对象 保存普通表单数据
        // files 对象 保存上传文件相关数据
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate == null ? Date.now : files.publishDate,
            cover: files.cover.filepath.split('public')[1] == null ? null : files.cover.filepath.split('public')[1],
            content: fields.content
        });
        // 重定向到文章列表页面
        res.redirect('/admin/article');
    });

}