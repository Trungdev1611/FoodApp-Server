const express = require('express')
const app = express()
const User = require('./models/User')
const InfoCart = require('./models/InfoCart')
const Comments = require('./models/Comments')
const Likes = require('./models/Likes')
const Replycomment = require('./models/Replycomment')

const routerAuth = require('./route/Auth')
const routeCart = require('./route/CartUser')
const routeComments = require('./route/CommentsRouter')
const routeLike = require('./route/Likeroute')
const replyroute = require('./route/ReplyCommentroute')

const cors = require('cors');
const sequelize = require('./ConnectDB');
require('dotenv').config()

const port = process.env.PORT || PORT || 80 || 3001
app.use(express.json())

//Association
User.hasMany(InfoCart)
// InfoCart.hasMany(Comments)
Comments.hasMany(Likes)
Comments.hasMany(Replycomment)


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
app.use('/likes', routeLike)
app.use('/reply', replyroute)

app.listen(port, (req, res) => {
    console.log(`server dang chay tren http://localhost:${port}`)
})