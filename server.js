var webpack = require('webpack')
var express = require('express')
var app = express()
var config = require('./webpack.config')
var webpackDevServer = require('webpack-dev-server')
var router = require('./lib/router')

app.use(express.static('./build'))
app.use(router)

if(config.debug) {
  var server = new webpackDevServer(webpack(config), {
    contentBase: false,
    hot: true,
    watchDelay: 100,
    port: 5678,
    stats: {
      cached: false,
      cachedAssets: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      errorDetails: false,
      exclude: ['node_modules'],
      hash: false,
      modules: true,
      reasons: false,
      version: false
    }
  })

  app = server.use(app)
}

console.log('\nListening on %s\n', config.server.url)
server.listen(config.server.port)
