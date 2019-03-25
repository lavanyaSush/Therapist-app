const mongoose = require('mongoose')
const { Schema } = mongoose
const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    options: {
        option: Schema.Types.ObjectId,
        ref: Options
    },
    thresholdKey: {
        type: String,
        enum: ['', 'L', 'H']
    },
    icon: {
        type: Buffer,
        required: true
    }
})
const Question = mongoose.model('Question', questionSchema)
module.exports = {
    Question
}