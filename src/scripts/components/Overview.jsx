var React = require('react')

var ListenerMixin = require('reflux').ListenerMixin
var ArtistStore = require('../stores/ArtistStore')
var LineupList = require('./LineupList')
var ArtistList = require('./ArtistList')
var Poster = require('./Poster')
var analytics = require('../lib/analytics')

var Overview = React.createClass({
  mixins: [ListenerMixin],

  getInitialState() {
    return this.getStateFromStore(ArtistStore)
  },

  getStateFromStore(Store) {
    return {
      artists: Store.getAll()
    }
  },

  componentDidMount() {
    analytics.page('Overview')
  },

  componentWillMount: function() {
    this.listenTo(ArtistStore, this.onStoreChange)
  },

  onStoreChange: function() {
    this.setState(this.getStateFromStore(ArtistStore))
  },

  render() {
    return (
      <main>
        <Poster />
        <LineupList />
        <ArtistList artists={this.state.artists}/>
      </main>
    )
  }
})

module.exports = Overview
