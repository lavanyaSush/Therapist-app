const mongoose = require('mongoose')
const { Schema } = mongoose
const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    options: {
        type: [Schema.Types.ObjectId],
        //ref: Option
    },
    // thresholdKey: {
    //     type: String,
    //     enum: ['', 'L', 'H']
    // },
    // 
    subCategory :{
        type : Schema.Types.ObjectId,
        ref :"SubCategory"
    },
    iconCategory :{
        type :Schema.Types.ObjectId,
        ref :"IconCategory"
    }
})
const Question = mongoose.model('Question', questionSchema)
module.exports = {
    Question
}
//create an icon category  which will have title and image 
//add an image category ref to question schema