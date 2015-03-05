var React = require('react')
var {Route, DefaultRoute} = require('react-router')

var Application = require('./components/Application')
var Overview = require('./components/Overview')
var Lineup = require('./components/Lineup')

var routes = (
  <Route handler={Application}>
    <DefaultRoute name="overview" handler={Overview} />
    <Route name="lineup" path=":day" handler={Lineup} />
  </Route>
)

module.exports = routes
