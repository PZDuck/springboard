const express = require('express')
const expressError = require('../expressError')
const { Message } = require('../models/message')
const { ensureLoggedIn } = require('../middleware/auth')

const messageRouter = new express.Router()

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
messageRouter.get('/:id', ensureLoggedIn, async (req, res, next) => {
    try {
        let message = await Message.get(req.params.id)
        
        if (message.to_user.username !== req.user.username && message.from_user.username !== req.user.username) {
            throw new expressError("Unauthorized", 401)
        }

        return res.json({message}) 
    } catch(e) {
        return next(e)
    }
})

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

messageRouter.post('/', ensureLoggedIn, async (req, res, next) => {
    try {
        let message = await Message.create(req.user.username, req.body.to_username, req.body.body)

        return res.json({message})
    } catch (e) {
        return next(e)
    }
})
/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

messageRouter.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
    try {
        let message = await Message.get(req.params.id)

        if (message.to_user.username !== req.user.username) {
            throw new expressError("Unauthorized", 401)
        }

        message = await Message.markRead(message.id)
        
        return res.json({message})
    } catch (e) {
        return next(e)
    }
})

module.exports = messageRouter