// 引用express框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块 处理post请求参数
const bodyParser = require('body-parser');
// 导入express-session
const session = require('express-session');
// 引入moment第三方模块
const moment = require('moment');
// 引入art-template 模板引擎
const template = require('art-template');
// 引入morgan第三方模块
const morgan = require('morgan');
// 引入config第三方模块
const config = require('config');
// 创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');
// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 配置session
app.use(session({ secret: 'secret key' }));

// 告诉express框架模板所在位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板默认后缀
app.set('view engine', 'art');
// 配置 当渲染后缀为art的模板时 所使用的模板引擎
app.engine('art', require('express-art-template'));

// 向模板内部导入dateformat对象
template.defaults.imports.moment = moment;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

console.log(config.get('title'));

// 获取系统环境变量 返回值是对象
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'));
} else {
    // 当前是生产环境
    console.log('当前是生产环境');
}

// 拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
    // JSON.parse() 将字符串转换为对象
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});

// 监听端口
app.listen(80);
console.log('网站服务器启动成功，请访问localhost');