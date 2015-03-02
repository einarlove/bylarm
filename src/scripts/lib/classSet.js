var compact = require('lodash/array/compact')
var filter = require('lodash/collection/filter')
var isArray = require('lodash/lang/isArray')
var isObject = require('lodash/lang/isObject')
var keys = require('lodash/object/keys')
var reduce = require('lodash/collection/reduce')

function classSet() {
  var classes = compact(reduce(arguments, function(values, argument) {
    if (isArray(argument)) {
      return values.concat(argument)
    } else if (isObject(argument)) {
      return values.concat(filter(keys(argument), function(key) {
        return argument[key]
      }))
    }

    return values.concat([argument])
  }, []))

  return classes.join(' ') || null
}

module.exports = classSet
