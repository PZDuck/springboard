const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../models/user')
const expressError = require('../expressError')
const { SECRET_KEY } = require('../config')

const authRouter = new express.Router()

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

authRouter.post('/login', async (req, res, next) => {
    try {
        let username = req.body.username

        if (await User.authenticate(username, req.body.password)) {
            let token = jwt.sign({ username }, SECRET_KEY)
            User.updateLoginTimestamp(username)
            return res.json({ token })
        } else {
            throw new expressError("Invalid credentials", 400)
        }
    } catch (e) {
        return next(e)
    }
})

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

authRouter.post('/register', async (req, res, next) => {
    try {
        let { username } = await User.register(req.body)
        let token = jwt.sign({ username }, SECRET_KEY)
        User.updateLoginTimestamp(username)

        return res.json({ token })
    } catch (e) {
        return next(new expressError("Missing or/and incorrect data", 400))
    }
})

 module.exports = authRouter