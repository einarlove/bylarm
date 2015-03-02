var React = require('react')

require('styles/ArtistHeader')

var ArtistHeader = React.createClass({
  getImageStyle() {
    return {
      backgroundImage: 'url('+ this.props.image +')'
    }
  },

  render() {
    return (
      <header className="artist-header" onClick={this.props.onClick}>
        <div className="artist-image" style={this.getImageStyle()}></div>
        <h1 className="artist-name">{this.props.name}</h1>
        <div className="close-button"></div>
      </header>
    )
  }

})

module.exports = ArtistHeader
