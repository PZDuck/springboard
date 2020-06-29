const express = require('express')
const User = require('../models/user')
const { authenticateJWT, ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth')

const userRouter = new express.Router()

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
userRouter.get('/', async (req, res, next) => {
    try {
        let users = await User.all()
        return res.json({users})
    } catch (e) {
        return next(e)
    }
})

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
userRouter.get('/:username', authenticateJWT, ensureCorrectUser, async (req, res, next) => {
    try {
        let user = await User.get(req.params.username)

        return res.json({user})
    } catch (e) {
        return next(e)
    }
})


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
userRouter.get('/:username/to', authenticateJWT, ensureLoggedIn, ensureCorrectUser, async (req, res, next) => {
    try {
        let messages = await User.messagesTo(req.params.username)
        
        return res.json(messages)
    } catch (e) {
        return next(e)
    }
})

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
userRouter.get('/:username/from', authenticateJWT, ensureCorrectUser, ensureLoggedIn, async (req, res, next) => {
    try {
        let messages = await User.messagesFrom(req.params.username)
        
        return res.json({messages})
    } catch (e) {
        return next(e)
    }
})

module.exports = userRouter