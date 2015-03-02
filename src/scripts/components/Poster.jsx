var React = require('react')

require('styles/Poster')

var PosterStore = require('../stores/PosterStore')
var posterText = require('assets/poster-text.raw')

var Poster = React.createClass({
  render() {

    var posterImageStyle = {
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
