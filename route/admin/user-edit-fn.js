// 引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');
// 引入加密模块
const bcrypt = require('bcrypt');


module.exports = async(req, res, next) => {

    // 实施验证
    try {
        await validateUser(req.body);
    } catch (error) {
        // 验证没有通过
        // 重定向至用户添加页面
        // ES6模板字符串方式
        //return res.redirect(`/admin/user-edit?message=${error.message}`);
        // JSON.stringify() 将对象数据类型转换为字符串
        // 调用next() 触发错误处理中间件 参数传递过去变成err
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }));
    }

    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    // 用户存在 则邮箱地址已被占用
    if (user) {
        // 重定向至用户添加页面
        //return res.redirect('/admin/user-edit?message=邮箱地址已经被占用');
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }));
    }

    // 对密码进行加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;

    // 将用户信息添加到数据库中
    await User.create(req.body);

    res.redirect('/admin/user');
};