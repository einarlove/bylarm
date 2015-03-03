var Reflux = require('reflux')
var request = require('axios')
var ArtistActions = require('../actions/ArtistActions')

var ArtistStore = Reflux.createStore({
  init() {
    this.artists = {}
    this.artists.list = []

    ArtistActions.open.listen(this.get)
  },

  get(id) {
    var artist = this.artists.list[id]

    if(!artist) {
      artist = this.artists.list[id] = {
        id: id
      }
    }

    if(!artist.allData) {
      artist.loading = true

      request.get('/api/artist/' + id).then(result => {
        artist = this.artists.list[artist.id] = result.data
        artist.allData = true
        artist.loading = false
        this.trigger()
      })
    }

    return artist
  },

  getAll() {
    if(!this.artists.complete && !this.artists.loading) {
      this.artists.loading = true

      request.get('/api/artists').then(result => {
        result.data.map(artist => {
          if(!this.artists.list[artist.id]) {
            this.artists.list[artist.id] = artist
          }
        })

        this.artists.complete = true
        this.artists.loading = false
        this.trigger()
      })
    }

    return this.artists
  }
})

module.exports = ArtistStore
