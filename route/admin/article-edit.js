const { Article } = require('../../model/article');

module.exports = async(req, res) => {

    // 标识 当前为文章管理页面
    req.app.locals.currentLink = 'article';

    const id = req.query.id;
    // 如果传递了id 则为文章信息修改
    if (id) {
        // 根据id查询文章
        let article = await Article.findOne({ _id: id });
        // 渲染文章信息修改页面
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });

    } else { // 添加文章

        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        });
    }


}