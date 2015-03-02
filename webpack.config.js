var webpack = require('webpack')

var production = process.env.NODE_ENV === 'production'
var development = !production
var devtool = development && 'eval'

var server = {}
server.port = process.env.PORT || 5000
server.url = (process.env.HOSTNAME || 'http://localhost') + ':' + server.port

var entries = {
  bundle: [ './src/scripts/index.jsx' ]
}

var output = {
  path: __dirname + '/build',
  filename: '[name].js',
  publicPath: '/',
  pathinfo: development
}

var loaders = [
  { test: /\.jsx$/, loader: development ? 'react-hot!babel' : 'babel', exclude: /node_modules/},
  { test: /\.styl$/, loader: 'style-loader!css!autoprefixer!stylus', exclude: /node_modules/},
  { test: /\.raw$/, loader: 'raw', exclude: /node_modules/},
  {test: /.(png|jpg|svg)$/, loader: 'url?limit=5000&name=images/[name].[ext]', exclude: /node_modules/}
]

var plugins = []

var resolve = {
  extensions: ['', '.js', '.jsx', '.json', '.css', '.styl'],
  modulesDirectories: ['node_modules', './src']
}


if (development) {
  // Add dev-server entry
  Object.keys(entries).forEach(function(entry) {
    entries[entry].push('webpack-dev-server/client?' + server.url, 'webpack/hot/only-dev-server')
  })

  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}

module.exports = {
  debug: development,
  devtool: devtool,
  server: server,
  entry: entries,
  output: output,
  module: {
    loaders: loaders
  },
  plugins: plugins,
  resolve: resolve
}
