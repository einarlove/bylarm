var Reflux = require('reflux')
var request = require('axios')
var map = require('lodash/collection/map')
var ArtistActions = require('../actions/ArtistActions')

var ArtistStore = Reflux.createStore({
  init() {
    this.artists = []

    if(!localStorage.hasOwnProperty('favorites')) {
      localStorage.setItem('favorites', '')
    }
    console.log(localStorage.getItem('favorites'))
    this.favorites = localStorage.getItem('favorites').split(',').map(v => {
      return +v
    })
  },

  getAll() {
    if(!this.artists.length) {
      request.get('https://blinding-inferno-1708.firebaseio.com/artists.json').then(result => {
        this.artists = map(result.data, artist => {
          return artist
        })

        this.trigger()
      })
    }

    return this.artists
  },

  isFavorite(id) {
    return this.favorites.indexOf(+id) > -1
  },

  toggleFavorite(id) {
    if(this.isFavorite(id)) {
      this.removeFavorite(id)
    } else {
      this.setFavorite(id)
    }
  },

  removeFavorite(id) {
    if(this.isFavorite(id)) {
      this.favorites.splice(this.favorites.indexOf(+id), 1)
    }

    this.updateLocalStorage()
    this.trigger()
  },

  setFavorite(id) {
    if(!this.isFavorite(id)) {
      this.favorites.push(+id)
    }

    this.updateLocalStorage()
    this.trigger()
  },

  updateLocalStorage() {
    localStorage.setItem('favorites', this.favorites)
  }
})

module.exports = ArtistStore
