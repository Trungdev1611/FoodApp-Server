const jwt = require("jsonwebtoken")
require('dotenv').config()
const checkAuth = (req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    const token = req.headers.authorization || req.headers['Authorization'] || req.header.authorization
    console.log('token::::', token)
    console.log('body::::', req.body)
    if (!token) {
        return res.status(401).json({
            err: "UnAuthorized"
        })
    }
    try {
        const accessTokendecode = jwt.verify(token, process.env.TOKENKEY)
        console.log('accessToken::::', accessTokendecode)
        //lay idUser va usernam tu token gui len
        req.userId = accessTokendecode.idUser
        return next()
    } catch (error) {
        return res.status(401).json({
            err: "jwt provide not valid"
        })
    }


}

module.exports = checkAuth