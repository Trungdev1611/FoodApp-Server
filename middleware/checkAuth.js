const jwt = require("jsonwebtoken")
require('dotenv').config()
const checkAuth = (req, res, next) => {
    const token = req.headers.authorization
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