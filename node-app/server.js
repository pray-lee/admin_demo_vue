const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = process.env.PORT || 3000
const db = require('./config/keys').mongoURI
const user = require('./routes/api/user')

// test
app.get('/', (req, res) => {
    res.send('hello node')
})

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