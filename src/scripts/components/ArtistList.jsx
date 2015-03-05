var React = require('react')

var Artist = require('./Artist')
var ArtistStore = require('../stores/ArtistStore')

var ArtistsList = React.createClass({
  sortAlphabetical(list) {
    return list.slice().sort((a, b) => {
      if(a.name < b.name) return -1
      if(a.name > b.name) return 1
      return 0
    })
  },

  render() {
    var artists = this.sortAlphabetical(this.props.artists).map(artist => {
      var favorite = ArtistStore.isFavorite(artist.id)

      if(this.props.filterFavorites && !favorite) {
        return
      }

      return <Artist artist={artist} favorite={favorite} key={artist.id} locationAt={this.props.locationAt}/>
    })

    return (
      <section className="artists-list">
        {artists}
      </section>
    )
  }
})

module.exports = ArtistsList
