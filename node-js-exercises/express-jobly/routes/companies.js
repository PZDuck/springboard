const express = require("express")
const Company = require("../models/company")
const jsonschema = require("jsonschema")
const createCompanySchema = require("../schemas/createCompanySchema.json")
const updateCompanySchema = require("../schemas/updateCompanySchema.json")

const router = new express.Router()

/** GET all available companies */

router.get("/", async function(req, res, next) {
    try {
        const companies = await Company.getAll(req.query)

        return res.json({ companies })
    } catch (e) {
        return next(e)
    }
})

router.post("/", async function(req, res, next) {
    try {
        const data = jsonschema.validate(req.body, createCompanySchema)

        if (!data.valid) {
            return next({status: 400, error: data.errors.map(e => e.stack)})
        }

        const company = await Company.create(req.body)

        return res.status(201).json({ company })
    } catch (e) {
        return next(e)
    }
})


router.get("/:handle", async function(req, res, next) {
    try {
        const company = await Company.getOne(req.params.handle)

        return res.json({ company })
    } catch (e) {
        return next(e)
    }
})

router.patch("/:handle", async function(req, res, next) {
    try {
        const data = jsonschema.validate(req.body, updateCompanySchema)
        
        if (!data.valid) {
            return next({status: 400, error: data.errors.map(e => e.stack)})
        }
        
        const company = await Company.edit(req.params.handle, req.body)

        return res.json({ company })
    } catch (e) {
        return next(e)
    }
})

router.delete("/:handle", async function(req, res, next) {
    try {
        const company = await Company.delete(req.params.handle)

        return res.json({ company })
    } catch (e) {
        return next(e)
    }
})


module.exports = router
