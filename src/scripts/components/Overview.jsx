var React = require('react')
var {Navigation, State} = require('react-router')

var ArtistActions = require('../actions/ArtistActions')
var ArtistStoreMixin = require('../stores/ArtistStoreMixin')
var LineupList = require('./LineupList')
var ArtistList = require('./ArtistList')
var Poster = require('./Poster')

var Overview = React.createClass({
  mixins: [ArtistStoreMixin, Navigation, State],

  componentDidMount() {
    ArtistActions.open.listen((id) => {
      if(this.isActive('overview')) {
        this.transitionTo('overview-artist', {id})
      }
    })

    ArtistActions.close.listen(() => {
      if(this.isActive('overview')) {
        if(!this.goBack()) this.transitionTo('overview')
      }
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
