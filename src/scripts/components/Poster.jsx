var React = require('react')

require('styles/Poster')

var PosterStore = require('../stores/PosterStore')
var posterText = require('assets/poster-text.raw')

var Poster = React.createClass({
  getInitialState() {
    return {
      inViewTween: 0
    }
  },

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },

  onScroll() {
    this.setState({
      inViewTween: Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
    })
  },

  render() {
    var translateY = this.state.inViewTween * 20
    var scale = 1 + this.state.inViewTween * 0.1

    var posterImageStyle = {
      transform: 'translate3d(0,'+ translateY +'%,0) scale('+ scale +')',
      backgroundImage: 'url(' + PosterStore.getPoster().image + ')'
    }

    return (
      <header className="poster">
        <div className="poster-image" ref="image" style={posterImageStyle}></div>
        <div className="poster-text" dangerouslySetInnerHTML={{__html: posterText}}>
        </div>
      </header>
    )
  }
})

module.exports = Poster
