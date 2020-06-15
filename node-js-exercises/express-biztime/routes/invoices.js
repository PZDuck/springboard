const db = require('../db')
const express = require('express')
const ExpressError = require('../expressError')

const router = new express.Router()


router.get('/', async function (req, res, next) {
    try {
        const invoice = await db.query(`
            SELECT id, comp_code
            FROM invoices`)
        
        return res.json({'invoices': invoices.rows})
    } catch (e) {
        return next(e)
    }
})

router.post('/', async function(req, res, next) {
    try {
        let { comp_code, amt } = req.body

        const invoice = await db.query(`
            INSERT INTO invoices (comp_code, amt)
            VALUES ($1, $2)
            RETURNING *`,
            [comp_code, amt])
        
        return res.json({'invoice': invoice.rows[0]})
    } catch (e) {
        return next(e)
    }
})

router.get('/:id', async function (req, res, next) {
    try {
        const invoice = await db.query(`
            SELECT *
            FROM invoices
            WHERE id=$1`,
            [req.params.id])
        
        if (!invoice.rows) throw new ExpressError(`No such invoice`, 404)

        return res.json("invoice": invoice)
    } catch (e) {
        return next(e)
    }
})

router.put('/:id', async function (req, res, next) {
    try {
        let { amt, paid } = req.body
        
        const invoice = await db.query(`
            SELECT paid
            FROM invoices
            WHERE id=$1`,
            [req.params.id])
        
        if (!invoice.rows) throw new ExpressError(`No such invoice`, 404)

        let paidDate = null
        let currPaid = invoice.rows[0].paid_date

        if (paid && !currPaid) {
            paidDate = new Date()
        } else if (!paid) {
            paidDate = null
        } else {
            paidDate = currPaid
        }

        const result = await db.query(`
            UPDATE invoices
            SET amt=$1, paid=$2, paid_date=$3
            WHERE id=$4
            RETURNING *`,
            [amt, paid, paidDate, req.params.id])
        
        return res.json({"invoice": result.rows[0]})
    } catch (e) {
        return next(e)
    }
})

router.delete("/:id", async function (req, res, next) {
    try {
        const result = await db.query(`
            DELETE FROM invoices
            WHERE id = $1
            RETURNING id`,
            [req.params.id])
  
        if (result.rows.length === 0) throw new ExpressError(`No such invoice:`, 404)
  
      return res.json({"status": "deleted"})
    }
  
    catch (err) {
      return next(err)
    }
  })
  
  
  module.exports = router