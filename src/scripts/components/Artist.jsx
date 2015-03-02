var React = require('react')
var {Navigation} = require('react-router')
var kebabCase = require('lodash/string/kebabCase')
var classSet = require('../lib/classSet')

require('styles/Artist')

var ArtistHeader = require('./ArtistHeader')
var ArtistContent = require('./ArtistContent')

var Artist = React.createClass({
  mixins: [Navigation],

  onHeaderClick() {
    if(this.props.compact) {
      this.transitionTo('artist', {
        id: this.props.artist.id,
        name: kebabCase(this.props.artist.name)
      })
    }
    else {
      this.goBack()
    }
  },

  render() {
    var artist = this.props.artist

    return (
      <article className="artist">
        <ArtistHeader
          name={artist.name}
          image={artist.image}
          heightRatio={this.props.headerHeightRatio}
          onClick={this.onHeaderClick}
          isCompact={this.props.compact}
        />

        {!this.props.compact &&
          <ArtistContent artist={artist}/>
        }
      </article>
    )
  }

})

module.exports = Artist
