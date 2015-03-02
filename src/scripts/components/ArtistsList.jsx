var React = require('react')
var debounce = require('lodash/function/debounce')

require('styles/ArtistsList')

var Artist = require('./Artist')

var ArtistsList = React.createClass({
  sortAlphabetical(list) {
    return list.slice().sort((a, b) => {
      if(a.name < b.name) return -1
      if(a.name > b.name) return 1
      return 0
    })
  },

  render() {
    var artists = this.sortAlphabetical(this.props.artists.list).map(artist => {
      return (
        <li className="artists-list-item" key={artist.id}>
          <Artist artist={artist}  headerHeightRatio={0.5} compact/>
        </li>
      )
    })

    return (
      <ul className="artists-list">
        {artists}
      </ul>
    )
  }

})

module.exports = ArtistsList
