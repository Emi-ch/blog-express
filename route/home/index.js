const { Article } = require('../../model/article');
// 引入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {

    const page = req.query.page;

    // 从数据库中查询数据
    // 查询所有文章数据 联合查询 author变成user对象
    // page 当前页 size 每页显示的数据条数 display 客户端要显示的页码数量 exec向数据库中发送查询请求
    let articles = await pagination(Article).find().page(page).size(4).display(3).populate('author').exec();
    let str = JSON.stringify(articles);
    let json = JSON.parse(str);
    // 渲染模板并传递数据
    res.render('home/default', {
        result: json
    });
}