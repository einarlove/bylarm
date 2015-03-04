var React = require('react')
var classSet = require('../lib/classSet')
var ScrollMixin = require('../lib/ScrollMixin')
var ArtistStore = require('../stores/ArtistStore')
var shallowEqual = require('react/lib/shallowEqual')

require('styles/Artist')

var ArtistHeader = require('./ArtistHeader')
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

  render() {
    var artist = this.props.artist

    var className = classSet({
      'artist': true,
      'open': this.state.open,
      'not-open': !this.state.open
    })

    return (
      <article className={className}>
        <ArtistHeader
          name={artist.name}
          image={artist.image}
          onClick={this.onHeaderClick}
        />

        {this.state.open &&
          <ArtistContent artist={artist}/>
        }
      </article>
    )
  }

})

module.exports = Artist
