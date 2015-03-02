var React = require('react')
var classSet = require('../lib/classSet')
var ExpandMixin = require('../lib/ExpandMixin')

require('styles/Artist')

var ArtistHeader = require('./ArtistHeader')
var ArtistContent = require('./ArtistContent')

var Artist = React.createClass({
  mixins: [ExpandMixin],
  offset: 0,

  onHeaderClick() {
    this.toggleExpand()
  },

  onExpand() {
    this.offset = -this.getDOMNode().getBoundingClientRect().top
  },

  onShrink() {
    this.offset = 0
  },

  getStyle() {
    return {
      WebkitTransform: 'translate3d(0,' + this.offset + 'px,0)',
      height: this.state.expanded ? window.innerHeight : 'auto'
    }
  },

  render() {
    var artist = this.props.artist
    var className = classSet({
      'artist': true,
      'in-transition': this.state.expandTransition > 0 && this.state.expandTransition < 1,
      'expanded': this.state.expanded
    })

    return (
      <article className={className} style={this.getStyle()}>
        <ArtistHeader
          name={artist.name}
          image={artist.image}
          onClick={this.onHeaderClick}
          expanded={this.state.expanded}
        />

        {this.state.expanded &&
          <ArtistContent artist={artist}/>
        }
      </article>
    )
  }

})

module.exports = Artist
