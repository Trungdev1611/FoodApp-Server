const commentsmodel = require('./../models/Comments')
const Replycomment = require('./../models/Replycomment')
const postComment = async (req, res) => {
    console.log('reqbody', req.body)
    req.body.username = req.username
    if (req.body.content && req.body.idfooditem && req.body.username) {
        let postData = await commentsmodel.create(req.body)
        return res.status(201).json({
            msg: 'Post comment thanh cong',
            data: postData
        })
    }

}

const getComment = async (req, res) => {
    //idfooditem duoc truyen qua params
    let idfoodItem = req.params.id

    let getdata = await commentsmodel.findAll({
        where: {
            idfoodItem: idfoodItem
        },
        //lay tat ca cac comment reply tuong ung voi comment gốc qua include, vì table commentReply có liên kết với comment gốc
        include: [{ model: Replycomment }]
    })
    if (getdata) {
        return res.status(200).json({
            "message": "Lay thong tin comments tren DB thanh cong",
            data: getdata
        })
    }
    else {
        return res.status(400).json("Failure Data comments")
    }
}

// const checkLikecomment = async (req, res) => {
//     const idcommentLike = req.params.idcommentlike
//     const checkLike = await commentsmodel.findOne({
//         where: { id: idcommentLike }
//     })
//     if (checkLike) {

//         if (checkLike.likes === null) {
//             console.log('aaaa::::')
//             checkLike.likes = 1
//             checkLike.save()
//             return res.status(201).json({ msg: 'Like thanh cong', data: checkLike })
//         }
//         if (checkLike.likes === "1") {
//             checkLike.likes = null
//             checkLike.save()
//             return res.status(201).json({ msg: 'Unlike thanh cong', data: checkLike })
//         }
//     }
//     else {
//         return res.status(404).json("Action like failure")
//     }


// }
module.exports = {
    postComment,
    getComment

}