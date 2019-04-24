// DB CONFIGURATION 

const mongoose = require('mongoose')

// telling mongoose to use ES6's promise library 
mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb+srv://manasa:sgdmvd99@cluster0-gngek.mongodb.net/test?retryWrites=true'
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('connected to DB'))
    .catch((err) => console.log(err))

