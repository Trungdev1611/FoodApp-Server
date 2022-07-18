const commentsmodel = require('./../models/Comments')

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
    let idfoodItem = req.params.id
    let getdata = await commentsmodel.findAll({
        where: {
            idfoodItem: idfoodItem
        }
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

module.exports = {
    postComment,
    getComment
}