var React = require('react')
var {State} = require('react-router')
var ListenerMixin = require('reflux').ListenerMixin

var Artist = require('./Artist')
var ArtistStore = require('../stores/ArtistStore')

var ArtistPage = React.createClass({
  mixins: [State, ListenerMixin],

  getInitialState() {
    return this.getStateFromStore()
  },

  getStateFromStore() {
    return {
      artist: ArtistStore.get(this.getParams().id)
    }
  },

  componentDidMount() {
    this.listenTo(ArtistStore, this.onStoreChange)
  },

  onStoreChange() {
    this.setState(this.getStateFromStore())
  },

  render() {
    return (
      <Artist artist={this.state.artist}/>
    )
  }

})

module.exports = ArtistPage
