var webpack = require('webpack')
var express = require('express')
var path = require('path')
var app = express()
var config = require('./webpack.config')

app.use(express.static('./build'))
app.use(express.static('./static'))

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '/src/index.html'))
})

if (!module.parent) {
  app.listen(config.server.port)
}

module.exports = app
