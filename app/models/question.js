const mongoose = require('mongoose')
const { Schema } = mongoose
const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory"
    },
    options: {
        type: [Schema.Types.ObjectId],
    },
    thresholdKey: {
        type: String,
        enum: ['', 'L', 'H']
    },
    imagecategory: {
        type: Schema.Types.ObjectId,
        ref: "IconCategory"
    }
    //create an icon category which will have title and image add image catergory ref to question schema
})
const Question = mongoose.model('Question', questionSchema)
module.exports = {
    Question
}