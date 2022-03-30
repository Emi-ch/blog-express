const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    // 接收客户端传递的请求参数
    const { username, email, password, role, state } = req.body;
    const id = req.query.id;

    // 查询将要修改的用户
    let user = await User.findOne({ _id: id });

    // 密码比对
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) { // 密码正确
        // 将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 重定向到用户列表页面
        res.redirect('/admin/user');
    } else { // 密码错误
        let obj = { path: '/admin/user-edit', message: '密码错误，不能修改用户信息', id: id };
        return next(JSON.stringify(obj));
    }
};