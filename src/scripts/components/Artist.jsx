var React = require('react')
var {Navigation} = require('react-router')
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var classSet = require('../lib/classSet')
var ExpandMixin = require('../lib/ExpandMixin')
var ScrollMixin = require('../lib/ScrollMixin')
var ArtistActions = require('../actions/ArtistActions')

require('styles/Artist')

var ArtistHeader = require('./ArtistHeader')
var ArtistContent = require('./ArtistContent')

var Artist = React.createClass({
  mixins: [ExpandMixin, PureRenderMixin, ScrollMixin, Navigation],
  offset: 0,

  componentDidMount() {
    ArtistActions.open.listen(this.onArtistOpen)
    ArtistActions.close.listen(this.onArtistClose)

    // Scroll to element if active on mount
    if (this.props.active) {
      this.scrollTo({
        atCenter: true,
        duration: 1200,
        easing: 'cubicInOut',
        instant: window.innerWidth < 600,
        onEnd: () => ArtistActions.open(this.props.artist.id)
      })
    }
  },

  onArtistOpen(id) {
    if(id === this.props.artist.id) {
      this.offset = -this.getDOMNode().getBoundingClientRect().top
      this.expand()
    }
  },

  onArtistClose() {
    if(this.state.expanded) {
      this.shrink()
    }
  },

  onHeaderClick() {
    if(this.props.active) {
      if(!this.goBack()) {
        this.transitionTo('overview')
      }
    } else {
      this.transitionTo('overview-artist', {id: this.props.artist.id})
    }
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
    var expanded = !this.state.inTransition && this.state.expanded
    var expanding = this.state.inTransition && this.state.expanded
    var shrinking = this.state.inTransition && !this.state.expanded

    var className = classSet({
      'artist': true,
      'in-transition': this.state.inTransition,
      'expanding': expanding,
      'expanded': expanded,
      'shrinked': !expanded && !expanding
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
