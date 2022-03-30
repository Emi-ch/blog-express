// 导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async(req, res) => {
    // 标识 当前为用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收客户端传递的当前页参数
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    let pagesize = 10;
    // 查询用户数据总数
    let count = await User.countDocuments({});
    // 总页数
    let total = Math.ceil(count / pagesize);
    // 当前页对应的开始数据位置
    let start = (page - 1) * pagesize;
    // 将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start);
    // 渲染用户列表模板
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });
};