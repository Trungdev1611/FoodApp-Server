const Replycomment = require('./../models/Replycomment')

const postReply = async (req, res) => {
    console.log("aaaaa::::", req.body) //{contentReply: xxx, commentId: xxx}
    if (req.body.contentReply && req.body.commentId) {
        const postData = req.body
        //Postdata bao gom content-commentReply, idcomment duoc reply,  userId reply
        postData.usernameReply = req.username  //req.userId trong checkAuth  
        //postData: {contentReply: xxx, username:xxx, commentId: xxx}
        //tao du lieu trong database
        console.log('PostData::', postData)
        let dataCreate = await Replycomment.create(postData)  //{contentReply: xxx, username:xxx, commentId: xxx, id:xxx, createAt:xxx, updateAt: xxx}
        return res.status(201).json({
            msg: 'Post reply comment success',
            data: dataCreate
        })
    }
    else {
        return res.status(404).json('The information missing')
    }


}


module.exports = {
    postReply
}