var ArtistStore = require('../stores/ArtistStore')
var ListenerMixin = require('reflux').ListenerMixin
var ArtistActions = require('../actions/ArtistActions')

var ArtistStoreMixin = {
  mixins: [ListenerMixin],

  getInitialState() {
    var getState = this.getStateFromStore || this.defaultGetStateFromStore
    return getState(ArtistStore)
  },

  defaultGetStateFromStore(Store) {
    return {
      artists: Store.getAll()
    }
  },

  componentWillMount() {
    this.listenTo(ArtistStore, this.onStoreChange)

    ArtistActions.open.listen(() => {
      document.body.style.overflow = 'hidden'
    })

    ArtistActions.close.listen(() => {
      document.body.style.overflow = 'visible'
    })
  },

  onStoreChange() {
    var getState = this.getStateFromStore || this.defaultGetStateFromStore
    this.setState(getState(ArtistStore))
  }
}

module.exports = ArtistStoreMixin
