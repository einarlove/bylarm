var React = require('react')

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
      return <Artist artist={artist} key={artist.id}/>
    })

    return (
      <section className="artists-list">
        {artists}
      </section>
    )
  }
})

module.exports = ArtistsList
