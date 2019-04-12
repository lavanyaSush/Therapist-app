const mongoose = require('mongoose')
const { Schema } = mongoose
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
    // assesmentCategory: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'AssesmentCategory',
    // }
})
const Category = mongoose.model('Category', categorySchema)
module.exports = {
    Category
}