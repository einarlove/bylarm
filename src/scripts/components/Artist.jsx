var React = require('react')
var classSet = require('../lib/classSet')
var ScrollMixin = require('../lib/ScrollMixin')
var ArtistStore = require('../stores/ArtistStore')
var shallowEqual = require('react/lib/shallowEqual')

require('styles/Artist')

var ArtistContent = require('./ArtistContent')

var Artist = React.createClass({
  mixins: [ScrollMixin],

  getInitialState() {
    return {
      open: false,
      scrollOrigin: null
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.inTransition && nextState.inTransition) return false

    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState)
  },

  onOpen() {
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
      backgroundImage: 'url(' + this.props.artist.image + ')'
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
          <ArtistContent artist={artist} />
        }
      </article>
    )
  }

})

module.exports = Artist
