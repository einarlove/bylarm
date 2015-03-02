var path = require('path')
var router = require('express').Router()
var api = require('./api')

router.get('/api/artists', function(req, res) {
  api.getArtists().then(function(result) {
    res.json(result)
  })
})

router.get('/api/artist/:id/', function(req, res) {
  api.getArtist(req.params.id).then(function(result) {
    res.json(result)
  })
})

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'))
})

module.exports = router
