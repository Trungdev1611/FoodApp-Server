const express = require('express')
// const User = require('./../models/User')
const routeCart = express.Router()
const cartUsercontroller = require('./../controller/cartUsercontroller')
const checkAuth = require('./../middleware/checkAuth')
//get cart by user
routeCart.get('/infocart', checkAuth, cartUsercontroller.getCartUser)


//post product to cart by user
routeCart.post('/producttocart', checkAuth, cartUsercontroller.postproductCart)




module.exports = routeCart