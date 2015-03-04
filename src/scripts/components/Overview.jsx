var React = require('react')

var ArtistStoreMixin = require('../stores/ArtistStoreMixin')
var ArtistActions = require('../actions/ArtistActions')
var LineupList = require('./LineupList')
var ArtistList = require('./ArtistList')
var Poster = require('./Poster')

var Overview = React.createClass({
  mixins: [ArtistStoreMixin()],

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
