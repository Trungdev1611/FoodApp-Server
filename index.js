const express = require('express')
const app = express()
const User = require('./models/User')
const InfoCart = require('./models/InfoCart')
const Comments = require('./models/Comments')

const routerAuth = require('./route/Auth')
const routeCart = require('./route/CartUser')
const routeComments = require('./route/CommentsRouter')

const cors = require('cors');
const sequelize = require('./ConnectDB');
require('dotenv').config()

const port = process.env.PORT
app.use(express.json())

//Association
User.hasMany(InfoCart)
// InfoCart.hasMany(Comments)
//create table sequelize
async function createTable() {
    await sequelize.sync(
        // { force: true }
    )
}
createTable()

//cau hinh cors, send data
app.use(cors());
app.use(express.json());
//--------------------------------------
//cau hinh route
app.use('/auth', routerAuth)
app.use('/cart', routeCart)
app.use('/comments', routeComments)

app.listen(port, (req, res) => {
    console.log(`server dang chay tren http://localhost:${port}`)
})