const express = require('express')
const router = express.Router()
const { AssesmentResult } = require('../models/assesmentresults')

//route to get assesmentResult detials
router.get('/', (req, res) => {
    AssesmentResult.find()
        .then((assesmentResult) => {
            res.send(assesmentResult)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add a assesmentResult 
router.post('/', (req, res) => {
    const body = req.body
    const assesmentResult = new AssesmentResult(body)
    assesmentResult.save()
        .then((assesmentResult) => {
            if (assesmentResult) {
                res.send(assesmentResult)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a assesmentResult by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    AssesmentResult.findById({ _id: id })
        .then((assesmentResult) => {
            if (assesmentResult) {
                res.send(assesmentResult)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a assesmentResult 
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    AssesmentResult.findByIdAndUpdate({ _id: id }, body, { new: true })
        .then((assesmentResult) => {
            if (assesmentResult) {
                res.send(assesmentResult)
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
    AssesmentResult.findByIdAndDelete(id)
        .then((assesmentResult) => {
            if (assesmentResult) {
                res.send(assesmentResult)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { assesmentResultRouter: router }