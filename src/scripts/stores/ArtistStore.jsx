var Reflux = require('reflux')
var request = require('axios')
var map = require('lodash/collection/map')
var ArtistActions = require('../actions/ArtistActions')

var ArtistStore = Reflux.createStore({
  init() {
    this.artists = []
    this.hasAll = false
  },

  getAll() {
    if(!this.hasAll) {
      request.get('https://blinding-inferno-1708.firebaseio.com/artists.json').then(result => {
        this.artists = map(result.data, artist => {return artist})
        this.hasAll = true

        this.trigger()
      })
    }

    return this.artists
  }
})

module.exports = ArtistStore
