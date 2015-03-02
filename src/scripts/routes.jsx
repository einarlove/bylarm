var React = require('react')
var {Route, DefaultRoute, Redirect} = require('react-router')

var Application = require('./components/Application')
var ArtistPage = require('./components/ArtistPage')
var Overview = require('./components/Overview')

var routes = (
  <Route path="/" handler={Application}>
    <Route name="artist" path="artist/:id/:name?" handler={ArtistPage}/>
    <DefaultRoute name="overview" handler={Overview}/>
  </Route>
)

module.exports = routes
