var React = require('react')
var {RouteHandler} = require('react-router')

require('styles/Application')

var Application = React.createClass({

  render() {
    return (
      <div className="application">
        <RouteHandler/>
      </div>
    )
  }

})

module.exports = Application
