const express = require('express')
const router = express.Router()
const { Child } = require('../models/child')

//route to get child detials
router.get('/', (req, res) => {
    Child.find()
        .then((childern) => {
            res.send(childern)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add a child 
router.post('/', (req, res) => {
    const body = req.body
    const child = new Child(body)
    child.save()
        .then((child) => {
            if (child) {
                res.send(child)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a child 
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    Child.findByIdAndUpdate({ _id: id }, body, { new: true })
        .then((child) => {
            if (child) {
                res.send(child)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a child by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    Child.findById({ _id: id })
        .then((child) => {
            if (child) {
                res.send(child)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to delete a record by Id
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Child.findByIdAndDelete(id)
        .then((child) => {
            if (child) {
                res.send(child)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { childRouter: router }