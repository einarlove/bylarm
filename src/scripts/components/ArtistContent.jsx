var React = require('react')
var moment = require('moment')

require('styles/ArtistContent')

var ArtistContent = React.createClass({

  renderShowList() {
    var shows = this.props.artist.shows.map(show => {
      var showDate = moment(show.showDateStart + show.showTimeStart, 'YYYY-MM-DDHH:mm:ss')
      var time = showDate.format('LT')
      var weekday = moment.weekdays(showDate.weekday())

      return (
        <a className="show-item" href="#" key={show.venueTitle}>
          <time className="show-date" dateTime={showDate.toJSON()}>
            {weekday + ' from ' + time + ' at '}
          </time>
          <span className="show-venue">{show.venueTitle}</span>
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
    var paragraphs = this.props.artist.descriptionParagraphs.map((paragraph, key) => {
      return <p key={key}>{paragraph}</p>
    })

    return (
      <div className="artist-biography">
        <h1>{this.props.artist.name}</h1>
        <h2>{this.props.artist.country}</h2>
        {paragraphs}
      </div>
    )
  },

  render() {
    if(this.props.artist.loading) {
      return <div>loading</div>
    }

    return (
      <div className="artist-content">
        <div className="artist-top-links">
          <a className="artist-top-link spotify" href="#">
            Listen on Spotify
          </a>
          <a className="artist-top-link favorite" href="#">
            Add to favorites
          </a>
        </div>

        {this.renderShowList()}
        {this.renderBiography()}

      </div>
    )
  }

})

module.exports = ArtistContent
