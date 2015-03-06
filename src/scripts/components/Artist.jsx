var React = require('react')
var shallowEqual = require('react/lib/shallowEqual')

var ListenerMixin = require('reflux').ListenerMixin
var findWhere = require('lodash/collection/findWhere')
var result = require('lodash/object/result')
var Spot = require('../lib/Spot')
var classSet = require('../lib/classSet')
var ScrollMixin = require('../lib/ScrollMixin')
var ArtistActions = require('../actions/ArtistActions')
var analytics = require('../lib/analytics')

require('styles/Artist')

var ArtistContent = require('./ArtistContent')

var Artist = React.createClass({
  mixins: [ScrollMixin, ListenerMixin, Spot.Mixin({
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

  getDefaultProps() {
    return {
      startPreviewDelay: 200,
      stopPreviewDelay: 50,
      scrollPreviewThreshold: 10
    }
  },

  componentDidMount() {
    this.listenTo(ArtistActions.open, this.onArtistOpen)
    this.listenTo(ArtistActions.close, this.onArtistClose)
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
      if(artistRect.top <= this.getDOMNode().getBoundingClientRect().top) {

        // scroll back the height of the previous artist's cotent
        console.log(this.props.artist.name, window.scrollY - artistRect.height)
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
    if(this.state.previewing) {
      return
    }

    this.setState({
      inTransition: true,
      scrollOrigin: window.scrollY
    })

    this.scrollTo({
      onEnd: this.open
    })
  },

  onClose() {
    if(this.state.previewing) {
      return
    }

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

    analytics.track('open', {
      label: this.props.artist.name,
      eventCategory: 'artist'
    })
  },

  close() {
    this.setState({
      open: false,
      inTransition: false
    })

    analytics.track('close', {
      label: this.props.artist.name,
      eventCategory: 'artist'
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

  startPreview() {
    if(
      this.state.isTriggeringPreview
      && !this.state.previewing) {

      var delta = Math.abs(this.state.triggerStartPosition - window.scrollY)
      if(delta > this.props.scrollPreviewThreshold) {
        return
      }

      this.setState({previewing: true})

      var audio = this.refs.previewAudio.getDOMNode()
      audio.load()
      audio.play()
    }
  },

  stopPreview() {
    if(!this.state.isTriggeringPreview && this.state.previewing) {
      this.setState({previewing: false})

      var audio = this.refs.previewAudio.getDOMNode()
      audio.pause()
      audio.currentTime = 0
    }
  },

  onPreviewTriggerEnter() {
    if(this.props.artist.music && this.props.artist.music.preview) {
      this.setState({
        isTriggeringPreview: true,
        triggerStartPosition: window.scrollY
      })
      setTimeout(this.startPreview, this.props.startPreviewDelay)
    }
  },

  onPreviewTriggerLeave() {
    if(this.props.artist.music && this.props.artist.music.preview) {
      this.setState({isTriggeringPreview: false})
      setTimeout(this.stopPreview, this.props.stopPreviewDelay)
    }
  },

  renderPreview() {
    if(this.state.previewing) {
      return (
        <div className="preview-overlay">
          <div className="track-artist">
            {this.props.artist.name}
          </div>
          <div className="track-title">
            {this.props.artist.music.preview.name}
          </div>
        </div>
      )
    }
  },

  render() {
    var artist = this.props.artist

    var venue = result(findWhere(artist.shows, {
        hour: this.props.locationAt
    }), 'venue')

    var className = classSet('artist', {
      'open': this.state.open,
      'not-open': !this.state.open,
      'has-venue': venue,
      'is-favorite': this.props.favorite,
      'show-preview-notice': !venue && artist.music && artist.music.preview,
      'is-previewing': this.state.previewing
    })

    return (
      <article className={className}>
        <header
          className="artist-header"
          onClick={this.onHeaderClick}
          onMouseDown={this.onPreviewTriggerEnter}
          onTouchStart={this.onPreviewTriggerEnter}
          onTouchLeave={this.onPreviewTriggerLeave}
          onTouchEnd={this.onPreviewTriggerLeave}
          onMouseLeave={this.onPreviewTriggerLeave}
          onMouseUp={this.onPreviewTriggerLeave}>

          <div className="artist-image" style={this.getHeaderImageStyle()}></div>

          <div className="info-overlay">
            <h1 className="artist-name">{artist.name}</h1>
            {venue && <div className="context-venue sub-title">{venue}</div>}

            <div className="preview-notice sub-title">
              hold for preview
            </div>

            {this.props.artist.music && this.props.artist.music.preview &&
              <audio preload="none" ref="previewAudio" src={this.props.artist.music.preview.url}/>
            }

            <div className="close-button"></div>
            <div className="favorite-star"></div>
          </div>

          {this.renderPreview()}
        </header>

        {this.state.open && !artist.loading &&
          <ArtistContent artist={artist} favorite={this.props.favorite} ref="content"/>
        }
      </article>
    )
  }

})

module.exports = Artist
