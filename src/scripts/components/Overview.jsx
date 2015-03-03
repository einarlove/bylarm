var React = require('react')
var {State} = require('react-router')

var ArtistActions = require('../actions/ArtistActions')
var ArtistStoreMixin = require('../stores/ArtistStoreMixin')
var LineupList = require('./LineupList')
var ArtistList = require('./ArtistList')
var Poster = require('./Poster')

var Overview = React.createClass({
  mixins: [State, ArtistStoreMixin],

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
