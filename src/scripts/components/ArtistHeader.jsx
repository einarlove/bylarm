var React = require('react')

require('styles/ArtistHeader')

var ArtistHeader = React.createClass({

  getDefaultProps() {
    return {
      heightRatio: 0.667
    }
  },

  getHeaderStyle() {
    return {
      paddingBottom: this.props.heightRatio * 100 + '%'
    }
  },

  getImageStyle() {
    return {
      backgroundImage: 'url('+ this.props.image +')'
    }
  },

  render() {
    return (
      <header className="artist-header" style={this.getHeaderStyle()} onClick={this.props.onClick}>
        <div className="artist-image" style={this.getImageStyle()}></div>
        <h1 className="artist-name">{this.props.name}</h1>

        {!this.props.isCompact &&
          <div className="close-button"></div>
        }
      </header>
    )
  }

})

module.exports = ArtistHeader
