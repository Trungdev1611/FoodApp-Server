const express = require('express')
const Likecontroller = require('./../controller/Likecontroller')
const routeLike = express.Router()

const checkAuth = require('./../middleware/checkAuth')

//get
routeLike.get('/getstatuslikes/:idcomment', checkAuth, Likecontroller.getlike)

//checklike
routeLike.get('/checklike/:idcomment', checkAuth, Likecontroller.checklike)

//get total like in comment
routeLike.get('/getTotallike/:idcomment', Likecontroller.getTotalLike)
module.exports = routeLike