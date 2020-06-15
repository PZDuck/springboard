const db = require('../db')
const express = require('express')
const ExpressError = require('../expressError')
const slugify = require('slugify')

const router = new express.Router()

router.get('/', async function (req, res, next) {
    try {
        const result = await db.query(`SELECT code, name FROM companies`)

        return res.json({"companies": result.rows})
    } catch (e) {
        return next(e)
    }
})

router.post('/', async function (req, res, next) {
    try {
        let { name, description } = req.body
        let code = slugify(name, {lower: true})

        const company = await db.query(`
            INSERT INTO companies (code, name, description) 
            VALUES ($1 $2 $3) 
            RETURNING code, name, description`, 
            [code, name, description])
        
        return res.status(201).json({"company": company.rows[0]})
    } catch (e) {
        return next(e)
    }
})

router.get('/:code', async function (req, res, next){
    try {
        const company = await db.query(`SELECT * FROM companies WHERE code=$1`, [res.params.code])
    
        if (!company.rows) throw new ExpressError(`No such company`, 404)

        return res.json({"company": company.rows})
    } catch (e) {
        return next(e)
    }
})

router.put('/:code', async function (req, res, next) {
    try {
        let { name, description } = req.body
        
        const company = await db.query(`
            UPDATE companies
            SET name=$1, description=$2
            WHERE code=$3
            RETURNING code, name, description`,
            [name, description, res.params.code] )
        
        if (!company.rows) throw new ExpressError(`No such company`, 404)

        return res.json({"company": company.rows[0]})
    } catch (e) {
        return next(e)
    }
})

router.delete('/:code', async function(req, res, next) {
    try {
        const company = await db.query(`
            DELETE FROM companies
            WHERE code=$1
            RETURNING code`,
            [res.params.code])
        
        if (!results.rows) throw new ExpressError(`No such company`, 404)

        return res.json({"status": "deleted"})
    } catch (e) {
        return next(e)
    }
})


