const express = require("express")
const Job = require("../models/job")
const jsonschema = require("jsonschema")
const createJobSchema = require("../schemas/createJobSchema.json")
const updateJobSchema = require("../schemas/updateJobSchema.json")

const router = new express.Router()


router.post("/", async function(req, res, next) {
    try {
        const data = jsonschema.validate(req.body, createJobSchema)

        if (!data.valid) {
            return next({ status: 400, error: data.errors.map(e => e.stack )})
        }

        const job = await Job.create(req.body)

        return res.json({ job })
    } catch(e) {
        return next(e)
    }
})

router.get("/", async function(req, res, next) {
    try {
        const jobs = await Job.getAll(req.query)

        return res.json({ jobs })
    } catch(e) {
        return next(e)
    }
})

router.get("/:id", async function(req, res, next) {
    try {
        const job = await Job.getOne(req.params.id)

        return res.json({ job })
    } catch (e) {
        return next(e)
    }
})

router.patch("/:id", async function(req, res, next) {
    try {
        const data = jsonschema.validate(req.body, updateJobSchema)
        
        if (!data.valid) {
            return next({status: 400, error: data.errors.map(e => e.stack)})
        }
        
        const job = await Job.edit(req.params.id, req.body)

        return res.json({ job })
    } catch (e) {
        return next(e)
    }
})

router.delete("/:id", async function(req, res, next) {
    try {
        const job = await Job.delete(req.params.id)

        return res.json({ job })
    } catch (e) {
        return next(e)
    }
})

module.exports = router