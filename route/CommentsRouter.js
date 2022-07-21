const express = require('express')
const commentscontroller = require('./../controller/commentscontroller')
const routeComments = express.Router()

const checkAuth = require('./../middleware/checkAuth')
//post comment
routeComments.post('/postcomment', checkAuth, commentscontroller.postComment)

//get comments
routeComments.get('/getcomments/:id', commentscontroller.getComment)





module.exports = routeComments