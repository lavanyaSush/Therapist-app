const mongoose = require('mongoose')
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
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    majorConcerns: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
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