var React = require('react')
var {Link, State, Navigation} = require('react-router')

var ListenerMixin = require('reflux').ListenerMixin
var ArtistStore = require('../stores/ArtistStore')
var ArtistList = require('./ArtistList')
var ScrollMixin = require('../lib/ScrollMixin')

require('styles/Lineup')

var Lineup = React.createClass({
  mixins: [State, ScrollMixin, ListenerMixin],

  getInitialState() {
    return this.getStateFromStore(ArtistStore)
  },

  getStateFromStore(Store) {
    return {
      artists: Store.getAll()
    }
  },

  componentWillMount: function() {
    this.listenTo(ArtistStore, this.onStoreChange)
  },

  componentDidMount() {
    this.scrollTo({instant: true})
  },

  onStoreChange: function() {
    this.setState(this.getStateFromStore(ArtistStore))
  },

  render() {

    return (
      <main>
        <header className="lineup-header">
          <Link className="back-button" to="overview">Back</Link>
          <h1 className="lineup-heading">{this.getParams().day}</h1>
        </header>

        <ArtistList artists={this.state.artists}/>
      </main>
    )
  }

})

module.exports = Lineup
