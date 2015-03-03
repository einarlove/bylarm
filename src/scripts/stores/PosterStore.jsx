var Reflux = require('reflux')
var random = require('lodash/number/random')

var PosterStore = Reflux.createStore({

  init() {
    this.posters = require('../posters')
    this.currentPoster = this.getNewPoster()
  },

  getRandomPoster() {
    return this.posters[random(this.posters.length - 1)]
  },

  getNewPoster() {
    var previousPosters = JSON.parse(localStorage.getItem('previousPosters')) || []
    var poster = null

    if (previousPosters.length >= this.posters.length) {
      previousPosters = []
    }

    do {
      poster = this.getRandomPoster()
    } while(previousPosters.indexOf(poster.image) >= 0)

    previousPosters.push(poster.image)
    localStorage.setItem('previousPosters', JSON.stringify(previousPosters))

    return poster
  },

  getPoster() {
    return this.currentPoster
  }
})

module.exports = PosterStore
