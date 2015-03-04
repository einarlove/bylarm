var React = require('react')
var shallowEqual = require('react/lib/shallowEqual')

var Spot = require('../lib/Spot')
var classSet = require('../lib/classSet')
var ScrollMixin = require('../lib/ScrollMixin')
var ArtistStore = require('../stores/ArtistStore')
var ArtistActions = require('../actions/ArtistActions')

require('styles/Artist')

var ArtistContent = require('./ArtistContent')

var Artist = React.createClass({
  mixins: [ScrollMixin, Spot.Mixin({
    proximity: '300%',
    triggerOnce: true
  })],

  getInitialState() {
    return {
      open: false,
      scrollOrigin: null,
      beenSpotted: false
    }
  },

  componentDidMount() {
    ArtistActions.open.listen(this.onArtistOpen)
    ArtistActions.close.listen(this.onArtistClose)
  },

  onSpot() {
    this.setState({
      beenSpotted: true
    })
  },

  onArtistOpen(id) {
    // if this artist is open but not being opened
    if(this.state.open && id !== this.props.artist.id) {
      var rect = this.refs.content.getDOMNode().getBoundingClientRect()
      ArtistActions.close(this.props.artist.id, rect)
      this.close()
    }
  },

  onArtistClose(id, artistRect) {
    // if this artist was opened and is not the one being closed
    if(this.state.open && id !== this.props.artist.id) {

      // if this artist is below the one closing
      if(artistRect.top < this.getDOMNode().getBoundingClientRect().top) {

        // scroll back the height of the previous artist's cotent
        this.scrollInstantToPosition(window.scrollY - artistRect.height)

        // remove the offset from scrollOrigin
        this.setState({
          scrollOrigin: this.state.scrollOrigin - artistRect.height
        })
      }

    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.inTransition && nextState.inTransition) return false

    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState)
  },

  onOpen() {
    console.log(this)
    ArtistStore.get(this.props.artist.id)

    this.setState({
      inTransition: true,
      scrollOrigin: window.scrollY
    })

    this.scrollTo({
      onEnd: this.open
    })
  },

  onClose() {
    this.setState({
      inTransition: true
    })

    var offset = this.getDOMNode().getBoundingClientRect().top
    var instant = offset > 50
    var position = instant ? window.scrollY : this.state.scrollOrigin

    this.animateScrollToPosition(position, {
      instant,
      onEnd: this.close
    })
  },

  open() {
    ArtistActions.open(this.props.artist.id)

    this.setState({
      open: true,
      inTransition: false
    })
  },

  close() {
    this.setState({
      open: false,
      inTransition: false
    })
  },

  onHeaderClick() {
    if(this.state.open) {
      this.onClose()
    } else {
      this.onOpen()
    }
  },

  getHeaderImageStyle() {
    return {
      backgroundImage: 'url(' + (this.state.beenSpotted ? this.props.artist.image : '') + ')'
    }
  },

  render() {
    var artist = this.props.artist
    var className = classSet({
      'artist': true,
      'open': this.state.open,
      'not-open': !this.state.open
    })

    return (
      <article className={className}>
        <header className="artist-header" onClick={this.onHeaderClick}>
          <div className="artist-image" style={this.getHeaderImageStyle()}></div>
          <h1 className="artist-name">{artist.name}</h1>
          <div className="close-button"></div>
        </header>

        {this.state.open && !artist.loading &&
          <ArtistContent artist={artist} ref="content"/>
        }
      </article>
    )
  }

})

module.exports = Artist
