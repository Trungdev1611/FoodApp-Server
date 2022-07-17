const { Router } = require('express')
const express = require('express')
// const User = require('./../models/User')
const routeCart = express.Router()
const cartUsercontroller = require('./../controller/cartUsercontroller')
const checkAuth = require('./../middleware/checkAuth')
//get cart by user
routeCart.get('/infocart', checkAuth, cartUsercontroller.getCartUser)

//get lengthCart
routeCart.get("/lengthCart", checkAuth, cartUsercontroller.getLengthCart)
//post product to cart by user
routeCart.post('/producttocart', checkAuth, cartUsercontroller.postproductCart)
//icrement Item in cart
routeCart.post('/increment-item-incart', checkAuth, cartUsercontroller.addCounIteminCart)
//deleteItem in cart
routeCart.delete("/deletecart/:id", checkAuth, cartUsercontroller.deleteItemCart)
//Buy cart => xoa empty cart
routeCart.delete("/removecart", checkAuth, cartUsercontroller.checkout)

module.exports = routeCart