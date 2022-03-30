const { Article } = require('../../model/article');
// 引入mongoose-sex-page第三方模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 接收客户端传递的页码
    const page = req.query.page;

    // 标识 当前为文章管理页面
    req.app.locals.currentLink = 'article';

    // 查询所有文章数据 联合查询 author变成user对象
    // page 当前页 size 每页显示的数据条数 display 客户端要显示的页码数量 exec向数据库中发送查询请求
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    let str = JSON.stringify(articles);
    let json = JSON.parse(str);
    // res.send(articles)
    // 渲染文章列表页面模板
    res.render('admin/article', {
        articles: json
    });
}