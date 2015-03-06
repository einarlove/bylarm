var Firebase = require('firebase')
var request = require('axios')
var moment = require('moment')

var pluck = require('lodash/collection/pluck')
var map = require('lodash/collection/map')
var compact = require('lodash/array/compact')

var db = new Firebase('https://blinding-inferno-1708.firebaseio.com')
var artistsRef = db.child('/artists')
var lineupRef = db.child('/lineup')

var urls = {
  byLarmIdList: 'http://s3.amazonaws.com/goevent-web-bylarm-2015/widgets/artist/widget_items_eng.json',

  bylarmArtist: function(id) {
    return 'http://s3.amazonaws.com/goevent-web-bylarm-2015/widgets/artist/widget_'+ id +'_eng.json'
  },

  spotifyArtist: function(name) {
    return 'https://api.spotify.com/v1/search?q='+ name +'&type=artist&limit=1'
  },

  spotifyTopTracks: function(spotifyId) {
    return 'https://api.spotify.com/v1/artists/' + spotifyId + '/top-tracks?country=NO'
  },

  map: {
    'Hoffmann Kulturstube (Kulturhuset basement)': 'https://www.google.no/maps/place/Kulturhuset/@59.91437,10.74935,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e6248461c51:0x8cbc247310c4acc?hl=no',
    'Parkteatret': 'https://www.google.no/maps/place/Parkteatret+Scene/@59.923524,10.758324,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e6898905407:0x2adc569aa802b50d?hl=no',
    'Red Bull Music Academy Stage': 'https://www.google.no/maps/place/Youngstorget+6,+0181+Oslo/@59.915,10.7485587,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e6252ae3ea5:0xdf294d289387785e?hl=no',
    'Sentrum Scene presented by Sony': 'https://www.google.no/maps/place/Sentrum+Scene/@59.915607,10.752035,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e63d9f8b72d:0x889fc4a02b060b4d?hl=no',
    'John Dee': 'https://www.google.no/maps/place/John+Dee+Live+Club+%26+pub/@59.915826,10.750344,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e63c6a40423:0x33ef37cbcde374a4?hl=no',
    'TIDAL Main Stage': 'https://www.google.no/maps/place/Youngstorget+6,+0181+Oslo/@59.915,10.7485587,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e6252ae3ea5:0xdf294d289387785e?hl=no',
    'Gamla': 'https://www.google.no/maps/place/Gamla/@59.913644,10.745164,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e6296f5e839:0x5c8bd5350201a2ae?hl=no',
    'Revolver': 'https://www.google.no/maps/place/Revolver/@59.914566,10.749779,17z/data=!4m2!3m1!1s0x46416e63904bd0bd:0x1ea5cf36bdd8ced7?hl=no',
    'P3 Stage': 'https://www.google.no/maps/place/Youngstorget+6,+0181+Oslo/@59.915,10.7485587,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e6252ae3ea5:0xdf294d289387785e?hl=no',
    'Internasjonalen': 'https://www.google.no/maps/place/Internasjonalen/@59.914566,10.749779,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e6236060a4d:0x2f311a016cc4580a?hl=no',
    'Mono': 'https://www.google.no/maps/place/Caf%C3%A9+Mono/@59.9139261,10.7489406,16z/data=!4m5!1m2!2m1!1sMono!3m1!1s0x0000000000000000:0x746e348048abcb76?hl=no',
    'Kulturhuset': 'https://www.google.no/maps/place/Kulturhuset/@59.91437,10.74935,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e6248461c51:0x8cbc247310c4acc?hl=no',
    'Rockefeller presented by BI': 'https://www.google.no/maps/place/Rockefeller+Music+Hall/@59.91616,10.750474,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e63c6a40423:0xd0089947f3a85ff0?hl=no',
    'The Church': 'https://www.google.no/maps/place/M%C3%B8llergata+30,+0179+Oslo/@59.9167547,10.7497128,17z/data=!3m1!4b1!4m2!3m1!1s0x46416e6396d4eeb3:0x6b7e844d83196b92?hl=no'
  }
}

function toWeekday(date) {
  return moment.weekdays(moment(date, 'YYYY-MM-DD').weekday()).toLowerCase()
}

function getIdtList() {
  return request.get(urls.byLarmIdList)
    .then(function(res) {
      return pluck(res.data, 'id')
    })
}

function fetchSpotify(artistData) {
  return request.get(urls.spotifyArtist(artistData.name))
  .then(function(result) {
    var spotifyData = result.data.artists.items[0]
    var url = spotifyData.external_urls.spotify
    artistsRef.child(artistData.id).child('music/spotify').set({
      type: 'spotify',
      url: url
    })

    return request.get(urls.spotifyTopTracks(spotifyData.id))
  }).then(function(result) {
    var tracks = result.data.tracks
    if(tracks.length) {
      artistsRef.child(artistData.id).child('music/preview').set({
        type: 'preview',
        url: tracks[0].preview_url,
        name: tracks[0].name
      })
    }
  })
}

function getArtist(id) {
  return request.get(urls.bylarmArtist(id)).then(function(result) {
    var data = result.data[0]

    // Format description to array of paragraphs
    var description = data.main.description.replace(/(\r\n|\n|\r)/gm, '')
    description = compact(description.split('<br/>'))

    var music = {}
    data.links.forEach(function(link) {
      if(link.info.type === 'wimp' ||
         link.info.type === 'soundcloud' ||
         link.info.type === 'spotify')

        music[link.info.type] = {
          type: link.info.type,
          url: link.link
        }
    })

    var shows = map(data.shows, function(show) {
      // var showDate = moment(show.showDateStart + show.showTimeStart, 'YYYY-MM-DDHH:mm:ss')
      // var time = showDate.format('LT')
      // var weekday = moment.weekdays(showDate.weekday())

      var day = moment(show.showDateStart + show.showTimeStart, 'YYYY-MM-DDHH:mm:ss')
      var weekday = moment.weekdays(day.weekday()).toLowerCase()
      var hour = day.format('HH:mm')

      if(hour.replace(':', '') < 1200) {
        day.day(day.day() + 1)
      }

      lineupRef.child(weekday).child(hour).child('title').set(hour)
      lineupRef.child(weekday).child(hour).child('artistIndex').child(data.main.id).set(data.main.id)
      lineupRef.child(weekday).child(hour).child('unixTimestamp').set(day.format('x'))

      return {
        weekday: weekday,
        hour: hour,
        venue: show.venueTitle,
        location: urls.map[show.venueTitle]
      }
    })

    var artistData = {
      id: data.main.id,
      name: data.main.title,
      country: data.extras.country,
      image: data.main.imageURL,
      description: description,
      shows: shows,
      music: music
    }

    artistsRef.child(id).set(artistData)

    return artistData
  }).then(fetchSpotify)
}

getIdtList().then(function(ids) {
  request.all(ids.map(getArtist))
})

