var React = require('react')
var classSet = require('../lib/classSet')
var capitalize = require('lodash/string/capitalize')
var ArtistStore = require('../stores/ArtistStore')

require('styles/ArtistContent')

var ArtistContent = React.createClass({

  renderShowList() {
    var shows = this.props.artist.shows.map((show, key) => {
      return (
        <a className="show-item" href={show.location} key={key} target="_blank">
          <time className="show-date">
            {capitalize(show.weekday) + ' from ' + show.hour + ' at '}
          </time>
          <span className="show-venue">{show.venue}</span>
          <div className="maps-reminder">Find venue on Google Maps</div>
        </a>
      )
    })

    return (
      <section className="show-list">
        {shows}
      </section>
    )
  },

  renderBiography() {
    var paragraphs = this.props.artist.description.map((paragraph, key) => {
      return <p key={key} dangerouslySetInnerHTML={{__html: paragraph}}/>
    })

    return (
      <div className="artist-biography">
        <h1>{this.props.artist.name}</h1>
        <h2>{this.props.artist.country}</h2>
        {paragraphs}
      </div>
    )
  },

  renderArtistMenu() {
    var favoriteButton = (
      <div onClick={this.onFavorite} className="artist-menu-item favorite">
        {this.props.favorite ? 'Remove' : 'My Bylarm'}
      </div>
    )

    return (
      <div className="artist-menu">
        {this.renderMusicButton()}
        {favoriteButton}
      </div>
    )
  },

  renderMusicButton() {
    var music = this.props.artist.music

    if(!music) return (
      <div className="artist-menu-item no-music">
        <span className="type">No music</span>
        <span className="prepended-text"> found</span>
      </div>
    )

    var preferred = music.spotify || music.soundcloud || music.wimp
    var className = classSet('artist-menu-item', preferred.type)

    return (
      <a className={className} href={preferred.url}>
        <span className="prepended-text">Listen on </span>
        <span className="type">{capitalize(preferred.type)}</span>
      </a>
    )
  },

  onFavorite() {
    ArtistStore.toggleFavorite(this.props.artist.id)
  },

  render() {
    return (
      <div className="artist-content">
        {this.renderArtistMenu()}
        {this.renderShowList()}
        {this.renderBiography()}
      </div>
    )
  }

})

module.exports = ArtistContent
