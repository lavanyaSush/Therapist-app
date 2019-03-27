const mongoose = require('mongoose')
const { Schema } = mongoose
const assessmentSchema = new Schema({
    child: {
        type: Schema.Types.ObjectId,
        ref: "Child",
        required: true
    },
    assessmentDate: {
        type: Date,
        required: true
    },
    discipline: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }

})
const Assessment = mongoose.model('Assessment', assessmentSchema)
module.exports = {
    Assessment
}