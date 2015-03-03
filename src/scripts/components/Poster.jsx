var React = require('react')

require('styles/Poster')

var PosterStore = require('../stores/PosterStore')
var posterText = require('assets/poster-text.raw')

var Poster = React.createClass({

  componentWillMount() {
    this.setState({
      poster: PosterStore.getPoster()
    })
  },

  getNewPoster() {
    this.setState({
      poster: PosterStore.getRandomPoster()
    })
  },

  render() {
    var posterImageStyle = {
      backgroundImage: 'url(' + this.state.poster.image + ')'
    }

    return (
      <header>
        <div className="poster-cover" onClick={this.getNewPoster}>
          <div className="poster-image" ref="image" style={posterImageStyle}></div>
          <div className="poster-text" dangerouslySetInnerHTML={{__html: posterText}}/>
        </div>

        <div className="poster-links">
          <a
            className="poster-link"
            href="http://bylarm.no/"
            target="_blank"
            style={{backgroundColor: this.state.poster.colors.primary}}>
            Official Site
          </a>
          <a
            className="poster-link"
            href="http://www.billettservice.no/search/?keyword=bylarm"
            target="_blank"
            style={{backgroundColor: this.state.poster.colors.secondary}}>
            Buy tickets
          </a>
        </div>
      </header>
    )
  }
})

module.exports = Poster
