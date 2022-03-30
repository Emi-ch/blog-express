// 导入用户集合构造函数
const { User } = require('../../model/user');
// 导入bcrypt 
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    // 接收请求参数
    const { email, password } = req.body;
    // 如果用户没有输入邮件地址 客户端请求地址格式错误 400
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    }
    // 根据邮箱地址查询用户信息
    // ES6中规定 属性与属性值同名 可以只写一个
    // 如果查询到了用户 user变量的值为对象类型
    // 如果没有查询到用户 user变量的值为空
    let user = await User.findOne({ email });

    if (user) {
        // 将客户端传递的密码与用户信息中的密码进行比对
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            //登录成功
            req.session.username = user.username;
            req.session.role = user.role;
            //res.send('登录成功');
            // 重定向到用户列表页面
            // 将user存储到app.locals 可以在模板中拿到该值
            req.app.locals.userInfo = user;
            // 对用户角色进行判断
            if (user.role == 'admin') {
                res.redirect('/admin/user');
            } else {
                res.redirect('/home/');
            }

        } else {
            res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
        }

    } else {
        // 没有查询到用户
        res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    }
}