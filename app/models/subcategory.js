const mongoose = require('mongoose')
const { Schema } = mongoose
const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        category: Schemaa.Types.ObjectId,
        ref: Category
    },
    question: {
        question: Schema.Types.ObjectId,
        ref: question
    }
})
const SubCategory = mongoose.model('SubCategory', subCategorySchema)
module.exports = {
    SubCategory
}