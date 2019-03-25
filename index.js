const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())
const { childRouter } = require('./app/controllers/child-controller')
require('./config/database')

app.get('/', (req, res) => {
    res.send('welcome to therapist-code')
})

app.use('/child', childRouter)

app.listen(port, () => {
    console.log('Listening to port', port)
})