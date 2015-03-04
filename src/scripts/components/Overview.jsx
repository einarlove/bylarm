var React = require('react')
var {Navigation} = require('react-router')

var ArtistStoreMixin = require('../stores/ArtistStoreMixin')
var ArtistActions = require('../actions/ArtistActions')
var LineupList = require('./LineupList')
var ArtistList = require('./ArtistList')
var Poster = require('./Poster')

var Overview = React.createClass({
  mixins: [Navigation, ArtistStoreMixin()],

  componentDidMount() {
    ArtistActions.open.listen((id) => {
      this.transitionTo('overview-artist', {id})
    })

    ArtistActions.close.listen(() => {
      if(!this.goBack()) this.transitionTo('overview')
    })
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
