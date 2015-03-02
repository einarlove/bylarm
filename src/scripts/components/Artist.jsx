var React = require('react')
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var classSet = require('../lib/classSet')
var ExpandMixin = require('../lib/ExpandMixin')


require('styles/Artist')

var ArtistHeader = require('./ArtistHeader')
var ArtistContent = require('./ArtistContent')

var Artist = React.createClass({
  mixins: [ExpandMixin, PureRenderMixin],
  offset: 0,

  onHeaderClick() {
    this.toggleExpand()
  },

  onExpand() {
    this.offset = -this.getDOMNode().getBoundingClientRect().top

  },

  getStyle() {
    var offset = this.state.expandTransition * this.offset

    if(!this.state.inTransition) {
      offset = Math.round(offset)
    }

    return {
      WebkitTransform: 'translate3d(0,' + offset + 'px,0)',
      height: this.state.expanded ? window.innerHeight : 'auto'
    }
  },

  render() {
    var artist = this.props.artist
    var expanding = this.state.inTransition && this.state.expanded
    var shrinking = this.state.inTransition && !this.state.expanded
    var fullyExpanded = !this.state.inTransition && this.state.expanded

    var className = classSet({
      'artist': true,
      'in-transition': this.state.inTransition,
      'expanding': expanding,
      'expanded': fullyExpanded,
      'shrinked': !fullyExpanded && !expanding
    })

    return (
      <article className={className} style={this.getStyle()}>
        <ArtistHeader
          name={artist.name}
          image={artist.image}
          onClick={this.onHeaderClick}
          expanded={this.state.expanded}
        />

        {(this.state.expanded || shrinking) &&
          <ArtistContent artist={artist}/>
        }
      </article>
    )
  }

})

module.exports = Artist
