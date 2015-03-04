var React = require('react')
var {Route, DefaultRoute, Redirect} = require('react-router')

var Application = require('./components/Application')
var Overview = require('./components/Overview')
var Lineup = require('./components/Lineup')

var routes = (
  <Route handler={Application}>
    <Route name="overview" path="/" handler={Overview}>
      <Redirect from="artist/?" to="overview"/>
      <Route name="overview-artist" path="artist/:id?"/>
    </Route>

    <Route name="lineup" path=":day" handler={Lineup}>
      <Redirect from="artist/?" to="lineup"/>
      <Route name="lineup-artist" path="artist/:id"/>
    </Route>
  </Route>
)

module.exports = routes
