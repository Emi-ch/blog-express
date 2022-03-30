const guard = (req, res, next) => {
    // 判断用户访问的是否是登录页面
    // 判断用户的登录状态
    /// 如果是登录的 将请求放行
    // 如果不是登陆的 将请求重定向至登陆页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 如果是普通用户登录
        if (req.session.role == 'normal') {
            // 跳转至博客首页
            return res.redirect('/home/');
        }
        // 用户是登录状态 将请求放行
        next();
    }
}

module.exports = guard;