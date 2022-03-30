// 1. 引入mongoose模块
const mongoose = require('mongoose');

// 2. 创建评论集合规则
const commentSchema = new mongoose.Schema({
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 评论时间
    time: {
        type: Date
    },
    // 评论内容
    content: {
        type: String
    }
});

// 3. 创建评论集合
const Comment = mongoose.model('Comment', commentSchema);

// 4. 将评论集合构造函数导出
module.exports = {
    Comment
}