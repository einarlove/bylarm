var React = require('react')
var {Link} = require('react-router')
var ListenerMixin = require('reflux').ListenerMixin

var PosterStore = require('../stores/PosterStore')
var ArtistStore = require('../stores/ArtistStore')
var ArtistsList = require('./ArtistsList')
var Poster = require('./Poster')

require('styles/Overview')

var Overview = React.createClass({
  mixins: [ListenerMixin],

  getInitialState() {
    return this.getStateFromStore()
  },

  getStateFromStore() {
    return {
      artists: ArtistStore.getAll()
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
      <main>
        <Poster />
        <MainNav />
        <Lineup />
        <ArtistsList artists={this.state.artists}/>
      </main>
    )
  }

})

var MainNav = React.createClass({
  render() {
    var colors = PosterStore.getPosterColors()

    return (
      <div className="main-nav">
        <a
          className="primary main-nav-link"
          href="http://bylarm.no/"
          target="_blank"
          style={{backgroundColor: colors.primary}}>
          Official Site
        </a>
        <a
          className="secondary main-nav-link"
          href="http://www.billettservice.no/search/?keyword=bylarm"
          target="_blank"
          style={{backgroundColor: colors.secondary}}>
          Buy tickets
        </a>

        { false &&
          <a
            className="tertiary main-nav-link"
            href="#"
            style={{backgroundColor: colors.tertiary}}>
            Next up at 6 pm
          </a>
        }
      </div>
    )
  }
})

var Lineup = React.createClass({
  days: ['wednesday', 'thursday', 'friday', 'saturday'],

  render() {
    var lineupLinks = this.days.map((day, key) => {
      return <a key={key} className="lineup-link" href="#">{day}</a>
    })

    return (
      <div className="lineup">
        {lineupLinks}
      </div>
    )
  }
})

module.exports = Overview