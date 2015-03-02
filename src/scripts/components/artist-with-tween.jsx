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
  },

  getStyle() {
    var offset = this.state.expandTransition * this.offset

    if(!offset || offset === this.offset) return {
      top: offset
    }
    else return {
      WebkitTransform: 'translate3d(0,' + offset + 'px,0)'
    }
  },

  render() {
    var artist = this.props.artist

    var artistStyle = this.getStyle()

    // if(this.state.expanded) {
    //   artistStyle.height = window.innerHeight
    // }

    var className = classSet({
      'artist': true,
      'in-transition': this.state.expandTransition > 0 && this.state.expandTransition < 1,
      'expanded': false && this.state.expanded
    })

    return (
      <article className={className} style={artistStyle}>
        <ArtistHeader
          name={artist.name}
          image={artist.image}
          onClick={this.onHeaderClick}
          expanded={false && this.state.expanded}
        />

      </article>
    )
        // {this.state.expanded &&
        //   <ArtistContent artist={artist}/>
        // }
  }

})

module.exports = Artist
