const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const port = process.env.PORT || 3000
const db = require('./config/keys').mongoURI
const user = require('./routes/api/user')
const passport = require('passport')

// passport init
app.use(passport.initialize())
// valid token
require('./config/passport')(passport)

// 解析post数据
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// router
app.use('/api/user', user)

// connect mongodb
mongoose.connect(db, { useNewUrlParser: true })

// listen connection
mongoose.connection.on('open', () => {
    console.log('connected')
})
mongoose.connection.on('error', err => {
    console.log(err)
})

// listen
app.listen(port, () => {
    console.log(`Server running at ${port}!`)
})