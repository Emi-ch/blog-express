const { User } = require('../../model/user');

module.exports = async(req, res) => {

    // 标识 当前为用户管理页面
    req.app.locals.currentLink = 'user';

    const { message, id } = req.query;
    // 如果传递了id参数 则为修改操作
    if (id) { // 修改
        let user = await User.findOne({ _id: id });
        // 渲染用户修改页面
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
    } else { // 添加
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }

};