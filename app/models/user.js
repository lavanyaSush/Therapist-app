const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose
const therapistSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid email id'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
const Therapist = mongoose.model('Therapist', therapistSchema)
module.exports = {
    Therapist
}