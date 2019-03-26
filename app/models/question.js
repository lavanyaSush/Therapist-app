const mongoose = require('mongoose')
const { Schema } = mongoose
const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    options: {
        type: [Schema.Types.ObjectId],
    },
    thresholdKey: {
        type: String,
        enum: ['', 'L', 'H']
    },
    icon: {
        type: Buffer,
        required: false
    }
})
const Question = mongoose.model('Question', questionSchema)
module.exports = {
    Question
}