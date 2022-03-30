const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    const { content, uid, aid } = req.body;

    // 将评论信息存储到评论集合中
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });

    // 重定向回文章详情页面
    res.redirect('/home/article?id=' + aid);

}