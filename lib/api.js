var request = require('axios')
var compact = require('lodash/array/compact')


function getByLarmArtist(id) {
  return request({
    url: 'http://s3.amazonaws.com/goevent-web-bylarm-2015/widgets/artist/widget_'+ id +'_eng.json'
  }).then(function(result) {
    var data = result.data[0]

    // Format description to array of paragraphs
    data.main.description = data.main.description.replace(/(\r\n|\n|\r)/gm,"")
    data.main.description = compact(data.main.description.split('<br/>'))

    return {
      id: data.main.id,
      name: data.main.title,
      descriptionParagraphs: data.main.description,
      country: data.extras.country,
      image: data.main.imageURL,
      links: data.links,
      shows: data.shows
    }
  })
}

function getSpotifyArtist(name) {
  if(!name) return;

  return request({
    url: 'https://api.spotify.com/v1/search?q='+ name +'&type=artist&limit=1'
  }).then(function(result) {
    var data = result.data.artists.items[0]

    if(!data) return;

    return {
      url: data.external_urls.spotify,
      id: data.id,
      image: data.images.length ? data.images[0].url : null
    }
  })
}

function getArtist(id, name) {
  return request.all([
    getByLarmArtist(id),
    getSpotifyArtist(name)
  ]).then(function(result) {
    result[0].spotify = result[1]
    return result[0]
  })
}

function getArtists(){
  return request({
    url: 'http://s3.amazonaws.com/goevent-web-bylarm-2015/widgets/artists/widget_items_eng.json'
  }).then(function(result) {
    artists = result.data[0].artists
    var formatedArtists = []

    for(artist in artists) {
      formatedArtists.push({
        id: artists[artist].id,
        name: artists[artist].title,
        image: artists[artist].imageURL.replace('web/artist', 'web/xl_artist'),
        shows: artists[artist].shows
      })
    }

    return formatedArtists
  })
}

module.exports = {
  getArtist: getArtist,
  getArtists: getArtists
}
