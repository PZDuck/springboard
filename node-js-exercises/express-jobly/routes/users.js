const express = require("express")
const User = require("../models/user")
const jsonschema = require("jsonschema")
const createUserSchema = require("../schemas/createUserSchema.json")
const updateUserSchema = require("../schemas/updateUserSchema.json")

const router = new express.Router()


router.post("/", async function(req, res, next) {
    try {
        const data = jsonschema.validate(req.body, createUserSchema)

        if (!data.valid) {
            return next({ status: 400, error: data.errors.map(e => e.stack) })
        }

        const user = await User.create(req.body)

        return res.json({ user })
    
    } catch (e) {
        return next(e)
    }
})

router.get("/", async function(req, res, next) {
    try {
        const users = await User.all()

        return res.json({ users })
    } catch (e) {
        return next(e)
    }
})