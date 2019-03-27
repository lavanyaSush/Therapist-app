const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())
const { childRouter } = require('./app/controllers/childs_controller')
const {therapistRouter} = require('./app/controllers/therapists_controller')
const {subcategoryRouter} = require('./app/controllers/subcategory_controller')
const {questionRouter} = require('./app/controllers/questions_controller')
const {categoryRouter} = require('./app/controllers/categories_controller')
const {optionRouter}=require('./app/controllers/options_controller')
require('./config/database')

app.get('/', (req, res) => {
    res.send('welcome to therapist-code')
})

app.use('/child', childRouter)
app.use('/therapist',therapistRouter)
app.use('/subCategory',subcategoryRouter)
app.use('/question',questionRouter)
app.use('/category',categoryRouter)
app.use('/option',optionRouter)
app.listen(port, () => {
    console.log('Listening to port', port)
})