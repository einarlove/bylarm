var React = require('react')
var {RouteHandler} = require('react-router')
var fastclick = require('fastclick')

require('styles/Application')

var Application = React.createClass({

  componentDidMount() {
    fastclick.attach(document.body)
  },

  render() {
    return (
      <div className="application">
        <RouteHandler/>
      </div>
    )
  }

})

module.exports = Application
