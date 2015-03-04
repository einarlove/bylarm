var ArtistStore = require('../stores/ArtistStore')
var ListenerMixin = require('reflux').ListenerMixin
var ArtistActions = require('../actions/ArtistActions')
var assign = require('lodash/object/assign')

var ArtistStoreMixin = function(options) {
  return assign({}, ListenerMixin, {
    getState(Store) {
      return {
        artists: Store.getAll()
      }
    },

    getInitialState() {
      return this.getState(ArtistStore)
    },

    componentWillMount: function() {
      this.listenTo(ArtistStore, this.onArtistStoreChange)

      ArtistActions.open.listen(() => {
        document.body.style.overflow = 'hidden'
      })

      ArtistActions.close.listen(() => {
        document.body.style.overflow = 'visible'
      })
    },

    onArtistStoreChange: function() {
      this.setState(this.getState(ArtistStore))
    }
  }, options)
}

module.exports = ArtistStoreMixin
