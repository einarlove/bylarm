var request = require('axios')
var pluck = require('lodash/collection/pluck')
var Firebase = require('firebase')
var db = new Firebase('https://blinding-inferno-1708.firebaseio.com')

function getIdtList() {
  return request.get('http://s3.amazonaws.com/goevent-web-bylarm-2015/widgets/artist/widget_items_eng.json')
    .then(function(res) {
      return pluck(res.data, 'id')
    })
}


getIdtList().then(function(ids) {
  console.log(ids)
})

var artistsRef = db.child('/artists')



/**
var Firebase = require('firebase');
var request = require('axios');
var db = new Firebase('http://derp:herp@snerp.com');

var artistsRef = db.child('/artists')

fetchByLarmArtists() {
  request('http://bylarmapitingen.com').then(res => {
    var artists = res.data;

    // db.ref('/artists').set(artists);
    // db.ref('artists')
    artists.forEach(artist => {
      var artistRef = artistsRef.child(artist.id)
      artistRef.child('name').set('')
      artistRef.child('image').set('')
    })
  })
}

fetchSpotifyArtist(id) {
  request('http://api.spotify.com/artists/' + event.child.id).then(res => {
    var artist = res.data;

    var artistRef = artistsRef.child(artist.id)
    artistRef.child('tracks').set(artist.tracks);
  })
}

fetchSoundCloudTracks(artistName) {
  request('http://api.soundcloud.com/artists/' + event.child.id).then(res => {
    var artist = res.data;
    var artistRef = artistsRef.child(artist.id)
    artistRef.child('tracks').push(artist.tracks);
  })
}

onArtistChanged(event) {
  fetchSpotifyArtist(event.child.id)
  fetchSoundCloudTracks(event.child.id)
}

db.child('/artists').on('child_added', onArtistChanged)
db.child('/artists').on('child_changed', onArtistChanged)

setInterval(5000, fetchByLarmArtists)




———————————————————


var Firebase = require('firebase');
var request = require('axios');
var db = new Firebase('http://derp:herp@snerp.com');

update() {
  request('http://bylarmapitingen.com').then(res => {
    var artists = res.data;

    // db.ref('/artists').set(artists);
    // db.ref('artists')
    artists.forEach(artist => {
      var artistRef = db.child('/artists/' + artist.id);
      artistRef.child('name').set('')
      artistRef.child('image').set('')
    })
  })
}

setInterval(5000, update)

————————


var Firebase = require('firebase');
var request = require('axios');
var db = new Firebase('http://derp:herp@snerp.com');

updateArtist(event) {
  request('http://api.spotify.com/artists/' + event.child.id).then(res => {
    var artist = res.data;

    event.child('tracks').set(artist.tracks);
  })
}

db.child('/artists').on('child_added', updateArtist)
db.child('/artists').on('child_changed', updateArtist)

 **/
