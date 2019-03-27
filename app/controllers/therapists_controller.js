const express = require('express')
const { Therapist } = require('../models/user')
const router = express.Router()
router.post('/register', (req, res) => {
    const body = req.body
    const therapist = new Therapist(body)
    therapist.save()
        .then((therapist) => {
            res.send(therapist)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.post('/login', (req, res) => {
    Therapist.findByEmailAndPassword(req.body.email, req.body.password)
        .then((therapist) => {
            return therapist.generateToken()
        })
        .then((token) => {
            res.send({
                token,
                notice: 'login successfully'
            })
        })
        .catch((err) => {
            res.send(err)
        })
})
router.get('/', (req, res) => {
    Therapist.find()
        .then((therapists) => {
            res.send(therapists)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.get('/:id', (req, res) => {
    Therapist.findById(req.params.id)
        .then((therapist) => {
            res.send(therapist)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Therapist.findByIdAndDelete(id)
        .then((therapist) => {
            res.send({
                therapist,
                notice: 'deleted successfully'
            })
        })
        .catch((err) => {
            res.send(err)
        })
})
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    Therapist.findByIdAndUpdate(id, body, { new: true })
        .then((therapist) => {
            res.send({
                therapist,
                notice: 'updated successfully'
            })
        })
        .catch((err) => {
            res.send(err)
        })
})
module.exports = {
    therapistRouter: router
}