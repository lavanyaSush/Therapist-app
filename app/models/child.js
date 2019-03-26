const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose
const childSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    childPhoto: {
        type: Buffer,
        required: false
    },
    dob: {
        type: Date,
        default: Date.now(),
        required: false
    },
    majorConcerns: {
        type: String,
        required: false
    },
    motherName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: false,
        maxlength: 10,
        validate: {
            validator: function (value) {
                return validator.isMobilePhone(value)
            },
            message: function (value) {
                return 'invalid phonenumber'
            }
        }
    },
    location: {
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
            message: function (value) {
                return 'invalid email id'
            }
        }
    }
})
const Child = mongoose.model('Child', childSchema)
module.exports = {
    Child
}