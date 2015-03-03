var React = require('react')
var {State} = require('react-router')
var ListenerMixin = require('reflux').ListenerMixin

var ArtistActions = require('../actions/ArtistActions')
var ArtistStore = require('../stores/ArtistStore')
var LineupList = require('./LineupList')
var ArtistList = require('./ArtistList')
var Poster = require('./Poster')

var Overview = React.createClass({
  mixins: [ListenerMixin, State],

  getInitialState() {
    return this.getStateFromStore()
  },

  getStateFromStore() {
    return {
      artists: ArtistStore.getAll()
    }
  },

  componentWillMount() {
    this.listenTo(ArtistStore, this.onStoreChange)
  },

  componentWillReceiveProps() {
    var id = this.getParams().id

    if(id) {
      document.body.style.overflow = 'hidden'
      ArtistActions.open(id)
    } else {
      document.body.style.overflow = 'auto'
      ArtistActions.close()
    }
  },

  onStoreChange() {
    this.setState(this.getStateFromStore())
  },

  render() {
    return (
      <main>
        <Poster />
        <LineupList />
        <ArtistList artists={this.state.artists} activeArtist={this.getParams().id}/>
      </main>
    )
  }
})

module.exports = Overview
