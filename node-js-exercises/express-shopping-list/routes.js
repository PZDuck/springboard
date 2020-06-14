const express = require('express')
const items = require('./fakeDb')
const router = express.Router()

router.get('', (req, res, next) => {
    try {
        return res.json(items)
    } catch (e) {
        return next(e)
    }
})

router.post('', (req, res, next) => {
    try {
        let item = {"name": req.body.name, "price": req.body.price}
        items.push(item)
        return res.status(201).json(item)
    } catch (e) {
        return next(e)
    }
})

router.get('/:name', (req, res, next) => {
    try {
        let item = items.find(obj => obj.name === req.params.name)
        return res.json(item)
    } catch (e) {
        return next(e)
    }
})

router.patch('/:name', (req, res, next) => {
    try {
        let item = items.find(obj => obj.name === req.params.name)
        item.name = req.body.name
        item.price = req.body.price
        return res.json(item)
    } catch (e) {
        return next(e)
    }
})

router.delete('/:name', (req, res, next) => {
    try {
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === req.params.name) {
                items.splice(i, 1)
            }
        }
        
        return res.json({"message": "Deleted"})
    } catch (e) {
        return next(e)
    }
})

module.exports = router