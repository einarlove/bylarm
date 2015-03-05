var React = require('react')
var {Link, State, Navigation} = require('react-router')

var map = require('lodash/collection/map')
var filter = require('lodash/collection/filter')
var ListenerMixin = require('reflux').ListenerMixin
var LineupStore = require('../stores/LineupStore')
var ArtistStore = require('../stores/ArtistStore')
var ArtistList = require('./ArtistList')
var ScrollMixin = require('../lib/ScrollMixin')
var Spot = require('../lib/Spot')
var classSet = require('../lib/classSet')
var analytics = require('../lib/analytics')

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
    analytics.page(this.getParams().day)
  },

  onStoreChange: function() {
    this.setState(this.getStateFromStore())
  },

  toggleFilter() {
    this.setState({
      filterFavorites: !this.state.filterFavorites
    })

    Spot.refresh()
  },

  renderHourSections() {
    return this.state.hours.map(hour => {
      var artists = filter(this.state.artists, artist => {
        return hour.artistIndex[artist.id]
      })

      return (
        <section className="hour-section" key={hour.title}>
          <header className="hour-header">{hour.title}</header>
          <ArtistList artists={artists} locationAt={hour.title} filterFavorites={this.state.filterFavorites}/>
        </section>
      )
    })
  },

  render() {
    var favoriteFilterClass = classSet('favorites-filter-toggle', {
      'is-toggled': this.state.filterFavorites
    })

    var dayTitle = window.innerWidth > 440 ? this.getParams().day : this.getParams().day.slice(0, 3)

    return (
      <main>
        <header className="lineup-header">
          <Link className="back-button" to="overview">Back</Link>
          <h1 className="lineup-heading">{dayTitle}</h1>
          <div className={favoriteFilterClass} onClick={this.toggleFilter}>My Bylarm</div>
        </header>

        {this.renderHourSections()}
      </main>
    )
  }

})

module.exports = Lineup
