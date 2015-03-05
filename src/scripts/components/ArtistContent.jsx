var React = require('react')
var classSet = require('../lib/classSet')

require('styles/ArtistContent')

var ArtistContent = React.createClass({

  renderShowList() {
    var shows = this.props.artist.shows.map((show, key) => {
      return (
        <a className="show-item" href={show.location} key={key} target="_blank">
          <time className="show-date">
            {show.weekday + ' from ' + show.hour + ' at '}
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

  renderMusicButton() {
    var music = this.props.artist.music

    if(!music) return (
      <div className="artist-menu-item no-music">
        <span className="type">No music</span>
        <span className="prepended-text"> found</span>
      </div>
    )

    var preferred = music.spotify || music.soundcloud || music.wimp
    var className = 'artist-menu-item ' + preferred.type

    return (
      <a className={className} href={preferred.url}>
        <span className="prepended-text">Play on </span>
        <span className="type">{preferred.type}</span>
      </a>
    )
  },

  render() {
    return (
      <div className="artist-content">
        <div className="artist-menu">
          {this.renderMusicButton()}
          <div className="artist-menu-item favorite">
          <span className="prepended-text">Add to </span>
            favorites
          </div>
        </div>

        {this.renderShowList()}
        {this.renderBiography()}
      </div>
    )
  }

})

module.exports = ArtistContent
