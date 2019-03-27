const express = require('express')
const cors = require('cors')

require('./config/database')

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())


const { childRouter } = require('./app/controllers/childs_controller')
const { categoryRouter } = require('./app/controllers/category_controller')
const { subcategoryRouter } = require('./app/controllers/subcategory_controller')
const { questionRouter } = require('./app/controllers/question_controller')
const { optionRouter } = require('./app/controllers/option_controller')
const { factorgridRouter } = require('./app/controllers/factorgrid_controller')
const { factorsummaryRouter } = require('./app/controllers/factorsummary_controller')
const { assesmentRouter } = require('./app/controllers/assesment_controller')
const { assesmentResultRouter } = require('./app/controllers/assementResults_controller')
const { therapistRouter } = require('./app/controllers/therapists_controller')
require('./config/database')

app.get('/', (req, res) => {
    res.send('welcome to therapist-code')
})


app.use('/child', childRouter)
app.use('/category', categoryRouter)
app.use('/subcategory', subcategoryRouter)
app.use('/question', questionRouter)
app.use('/option', optionRouter)
app.use('/factorgrid', factorgridRouter)
app.use('/factorsummary', factorsummaryRouter)
app.use('/therapist', therapistRouter)
app.use('/assesment', assesmentRouter)
app.use('/assesmentResult', assesmentResultRouter)

app.listen(port, () => {
    console.log('Listening to port', port)
})