const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = require('promise')
const path = require('path')

const controllers = require('./app/controllers')
const server = express()
const bodyParser = require('body-parser')

server.use(express.static('public'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/tldrDatabase')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error:'))
db.once('open', (err) => {
  if (err) {
    throw new Error('Db not connected')
  }
  server.listen(process.env.PORT || 3000)
  console.log('DB connected successfully and APP listening at: ' + Date())
})

// get request to fetch Sources from news API
server.get('/sources', controllers.sources.get)
server.get('/categories', controllers.categories.get)
server.get('/fetchSources/:cat', controllers.fetchSources.get)
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/app/index.html'))
})
server.post('/addUser', controllers.users.post)
