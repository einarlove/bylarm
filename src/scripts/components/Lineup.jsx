var React = require('react')
var {Link, State, Navigation} = require('react-router')

var map = require('lodash/collection/map')
var filter = require('lodash/collection/filter')
var ListenerMixin = require('reflux').ListenerMixin
var LineupStore = require('../stores/LineupStore')
var ArtistStore = require('../stores/ArtistStore')
var ArtistList = require('./ArtistList')
var ScrollMixin = require('../lib/ScrollMixin')

require('styles/Lineup')

var Lineup = React.createClass({
  mixins: [State, ScrollMixin, ListenerMixin],

  getInitialState() {
    return this.getStateFromStore()
  },

  getStateFromStore() {
    return {
      artists: ArtistStore.getAll(),
      hours: LineupStore.getDay(this.getParams().day)
    }
  },

  componentWillMount: function() {
    this.listenTo(ArtistStore, this.onStoreChange)
    this.listenTo(LineupStore, this.onStoreChange)
  },

  componentDidMount() {
    this.scrollTo({instant: true})
  },

  onStoreChange: function() {
    this.setState(this.getStateFromStore())
  },

  renderHourSections() {
    return this.state.hours.map(hour => {
      var artists = filter(this.state.artists, artist => {
        return hour.artistIndex[artist.id]
      })

      return (
        <section className="hour-section" key={hour.title}>
          <header className="hour-header">{hour.title}</header>
          <ArtistList artists={artists}/>
        </section>
      )
    })
  },

  render() {

    return (
      <main>
        <header className="lineup-header">
          <Link className="back-button" to="overview">Back</Link>
          <h1 className="lineup-heading">{this.getParams().day}</h1>
        </header>

        {this.renderHourSections()}
      </main>
    )
        // <ArtistList artists={this.state.artists}/>
  }

})

module.exports = Lineup
