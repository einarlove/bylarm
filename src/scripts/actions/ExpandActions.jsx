var Reflux = require('reflux')

var ExpandActions = {
  expand: Reflux.createAction(),
  shrink: Reflux.createAction()
}

module.exports = ExpandActions
