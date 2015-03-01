var React = require('react')
var {Route, DefaultRoute, Redirect} = require('react-router')

var Application = require('./components/Application')
var Overview = require('./components/Overview')

var routes = (
  <Route path="/" handler={Application}>
    <DefaultRoute name="overview" handler={Overview}/>
  </Route>
)

module.exports = routes
