const Likemodel = require('./../models/Likes')

const checklike = async (req, res) => {
    let commentId = req.params.idcomment
    if (commentId) {
        let findComment = await Likemodel.findOne({
            where: {
                userId: req.userId,
                commentId: commentId
            }
        })
        if (findComment) {
            await Likemodel.destroy({
                where: {
                    userId: req.userId,
                    commentId: commentId
                }
            })
            return res.status(204).json({
                msg: 'Unlike success',
                data: findComment
            })
        }
        let createData = await Likemodel.create({
            userId: req.userId,
            commentId: commentId
        })
        return res.status(200).json({
            msg: "like success",
            data: createData
        })
    }

}

const getlike = async (req, res) => {
    let commentId = req.params.idcomment
    if (commentId) {
        let findComment = await Likemodel.findOne({
            where: {
                userId: req.userId,
                commentId: commentId
            }
        })
        if (findComment) {
            res.status(200).json({ msg: "dalike", errCode: 1 })
        }
        else {
            res.status(200).json({ msg: "chualike", errCode: 0 })
        }
    }
    else {
        res.status(401).json({ msg: 'UnAuthorization' })
    }
}

const getTotalLike = async (req, res) => {
    //id cua comment check total like

    let idcomment = req.params.idcomment
    //loc cac comment co id tuong ung trong db
    if (idcomment) {
        let totalCommentByid = await Likemodel.findAll({
            where: { commentId: idcomment },
            attributes: ['userId'],
            raw: true,
        })
        console.log('totalcommentbyid:::', totalCommentByid) //[ { userId: '2' }, { userId: '1' } ]
        return res.status(200).json({
            msg: 'getTotal like in comment succeed',
            totallike: totalCommentByid.length
        })
    }
    else {
        return res.status(404).json({
            msg: "Thiếu param in comments"
        })
    }

}

module.exports = {
    checklike,
    getlike,
    getTotalLike
}