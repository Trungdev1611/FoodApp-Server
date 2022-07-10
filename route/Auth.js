const express = require('express')
// const User = require('./../models/User')
const routerAuth = express.Router()
const AuthController = require('./../controller/AuthController')

//register
routerAuth.post('/register', AuthController.register)

//login route
routerAuth.post('/login', AuthController.login)




module.exports = routerAuth