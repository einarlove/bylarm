var React = require('react')
var {Navigation, State} = require('react-router')
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var classSet = require('../lib/classSet')
var ScrollMixin = require('../lib/ScrollMixin')
var ArtistActions = require('../actions/ArtistActions')

require('styles/Artist')

var ArtistHeader = require('./ArtistHeader')
var ArtistContent = require('./ArtistContent')

var Artist = React.createClass({
  mixins: [PureRenderMixin, ScrollMixin, Navigation, State],

  getInitialState() {
    return {
      open: false,
      scrollOrigin: null,
      contentExpanded: false
    }
  },

  componentDidMount() {
    // Scroll to element if active on mount
    if (this.isActiveArtist()) {
      this.scrollTo({
        atCenter: true,
        duration: 1200,
        easing: 'cubicInOut',
        instant: window.innerWidth < 600,
        onEnd: () => ArtistActions.open(this.props.artist.id)
      })
    }
  },

  isActiveArtist() {
    return this.getParams().id === this.props.artist.id
  },

  componentWillReceiveProps() {
    if(!this.state.open && this.isActiveArtist()) {
      this.open()
    }
    else if(this.state.open && !this.isActiveArtist()) {
      this.close()
    }
  },

  componentWillUpdate(nextProps, nextState) {
  },

  componentDidUpdate(prevProps, prevState) {
    // Combat browser scroll bug when you go back and forth in history
    if(this.state.contentExpanded && !prevState.contentExpanded) {
      this.scrollTo({instant: true})
    }
  },

  open() {
    this.setState({
      open: true,
      scrollOrigin: window.scrollY
    })

    this.scrollTo({onEnd: this.expandContent})
  },

  close() {
    this.setState({
      open: false
    })

    var offset = this.getDOMNode().getBoundingClientRect().top
    var instant = offset > 50
    var position = instant ? window.scrollY : this.state.scrollOrigin
    var duration = 500 + Math.abs(offset / 2)

    this.animateScrollToPosition(position, {
      instant,
      duration,
      onEnd: this.minimizeContent
    })
  },

  expandContent() {
    this.setState({
      contentExpanded: true
    })
  },

  minimizeContent() {
    this.setState({
      contentExpanded: false
    })
  },

  onHeaderClick() {
    if(this.state.open) {
      ArtistActions.close()
    } else {
      ArtistActions.open(this.props.artist.id)
    }
  },

  getStyle() {
    return {}
    return {
      WebkitTransform: 'translate3d(0,' + this.state.offset + 'px,0)',
      height: this.state.open ? window.innerHeight : 'auto'
    }
  },

  render() {
    var artist = this.props.artist

    var className = classSet({
      'artist': true,
      'open': this.state.open && this.state.contentExpanded,
      'not-open': !this.state.open
    })

    return (
      <article className={className} style={this.getStyle()}>
        <ArtistHeader
          name={artist.name}
          image={artist.image}
          onClick={this.onHeaderClick}
        />

        {this.state.contentExpanded &&
          <ArtistContent artist={artist}/>
        }
      </article>
    )
  }

})

module.exports = Artist
