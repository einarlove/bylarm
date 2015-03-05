var webpack = require('webpack')
var config = require('../webpack.config')
var middleware = require('../server')
var webpackDevServer = require('webpack-dev-server')

config.plugins.push(new webpack.ProgressPlugin(function(progress, message) {
  process.stderr.clearLine()
  process.stderr.cursorTo(0)

  if (progress < 1) {
    process.stderr.write(Math.floor(progress * 100) + '% ' + message + (progress === 1 ? '\n' : ''))
  }
}))

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

server.use(middleware)

console.log('\nListening on %s\n', config.server.url)
server.listen(config.server.port)
