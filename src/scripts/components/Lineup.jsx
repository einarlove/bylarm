var React = require('react')
var {Link, State, Navigation} = require('react-router')
var pluck = require('lodash/collection/pluck')

var ArtistStoreMixin = require('../stores/ArtistStoreMixin')
var ArtistActions = require('../actions/ArtistActions')
var ArtistList = require('./ArtistList')
var ScrollMixin = require('../lib/ScrollMixin')

require('styles/Lineup')

var Lineup = React.createClass({
  mixins: [ArtistStoreMixin, Navigation, State, ScrollMixin],

  componentDidMount() {
    this.scrollTo({instant: true})

    ArtistActions.open.listen((id) => {
      if(this.isActive('lineup')) {
        var day = this.getParams().day
        this.transitionTo('lineup-artist', {day, id})
      }
    })

    ArtistActions.close.listen(() => {
      if(this.isActive('lineup')) {
        var day = this.getParams().day
        if(!this.goBack()) this.transitionTo('lineup', {day})
      }
    })
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
