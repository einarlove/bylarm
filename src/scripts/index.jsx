var React = require('react')
var Router = require('react-router')
var routes = require('./routes')
var scrollBehavior = require('./scrollBehavior')

var router = Router.create({
  routes,
  location: Router.HistoryLocation,
  scrollBehavior
})

router.run(Handler => React.render(<Handler />, document.body))
