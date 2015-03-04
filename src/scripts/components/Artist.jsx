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
      open: false
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
        onEnd: this.open
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

  open() {
    this.setState({
      open: true,
      offset: -this.getDOMNode().getBoundingClientRect().top
    })
  },

  close() {
    this.setState({
      open: false,
      offset: 0
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
    return {
      WebkitTransform: 'translate3d(0,' + this.state.offset + 'px,0)',
      height: this.state.open ? window.innerHeight : 'auto'
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
      <article className={className} style={this.getStyle()}>
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
