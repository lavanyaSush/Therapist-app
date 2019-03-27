const mongoose = require('mongoose')
const { Schema } = mongoose
const assesmentResultSchema = new Schema({
    assessment: {
        type: Schema.Types.ObjectId,
        ref: "Assessment"
    },
    results: {
        type: [
            {
                subcategory: {
                    type: Schema.Types.ObjectId,
                    ref: 'SubCategory'
                },
                questions: [
                    {
                        question: {
                            type: Schema.Types.ObjectId,
                            ref: "Question"
                        },
                        option: {
                            type: Schema.Types.ObjectId,
                            ref: 'Option'
                        }
                    }
                ],
                rawScore: {
                    type: Number
                }
            }
        ]
    }

})

const Assesmentresult = mongoose.model('Assesmentresult', assesmentResultSchema)
module.exports = {
    Assesmentresult
}

// [
    // {
    //     "subCategory": "123",
    //     "questions": [
    //         {
    //             "question": 1,
    //             "option": 1
    //         },
    //         {
    //             "question": 2,
    //             "option" :1
    //         }
    //     ],
    //     "rawScore": 40
    // },
//     {
//         "subCategory": "124",
//         "questions": [
//             {
//                 "question": 1,
//                 "option": 1
//             },
//             {
//                 "question": 2,
//                 "option" 1
//             }
//         ]
//     }
// ]