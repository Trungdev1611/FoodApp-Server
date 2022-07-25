const User = require('./../models/User')
const jwt = require("jsonwebtoken")
require('dotenv').config()
//register controller
const register = async (req, res) => {
    const { username, password } = req.body
    if (!(username && password)) {
        return res.status(400).json({
            error: 'Incorrect Username or password'
        })
    }
    let checkuser = await User.findOne({ where: { username: username } })
    if (checkuser) {
        return res.status(409).json({
            error: 'Username already exits'
        })
    }
    await User.create({ username: username, password: password })
    res.status(200).json({ success: 'Register successful' })
}


//login controller
const login = async (req, res) => {
    const { username, password } = req.body
    if (!username && !password) {
        return res.status(400).json({
            error: 'Error',
            message: "The username was incorrect. Please try again"
        })
    }

    if (username) {
        let user = await User.findOne({ where: { username: username } })
        if (!user) {
            return res.status(400).json({
                error: 'Username',
                message: "The username was incorrect. Please try again or create an account"

            })
        }
        if (password !== user.password) {
            return res.status(400).json({
                error: 'Password',
                message: "The password was incorrect. Please try again"
            })
        }
        const accessToken = jwt.sign({ idUser: user.id, username: user.username }, process.env.TOKENKEY, { expiresIn: 5 * 60 * 1000 })
        return res.status(200).json({
            message: "Login success",
            accessToken: accessToken
        })
    }
}
module.exports = {
    register,
    login
}