const express = require('express')
const ReplyController = require('./../controller/Replycontroller')
const routeReply = express.Router()

const checkAuth = require('./../middleware/checkAuth')

//get
routeReply.post('/replycomment', checkAuth, ReplyController.postReply)


module.exports = routeReply