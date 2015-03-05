var requestAnimationFrame = require('raf')
var assign = require('lodash/object/assign')

var Spot = {
  listeners: [],
  running: false,
  lastScrollTop: null
}

Spot.start = function() {
  if(!Spot.running) {
    Spot.running = true
    Spot.interval()
  }
}

Spot.stop = function() {
  Spot.running = false
}

Spot.refresh = function() {
  Spot.forceRun = true
  Spot.interval()
}

Spot.addListener = function(listener) {
  listener = assign({}, listener, {
    eventName: 'enter',
    withinProximityLastFrame: false
  })

  Spot.listeners.push(listener)
  Spot.start()
  return listener
}

Spot.removeListener = function(listener) {
  var index = Spot.listeners.indexOf(listener)

  if(index > -1) {
    Spot.listeners.splice(index, 1)
  }
}

Spot.interval = function() {
  var scrollTop = window.scrollY || document.documentElement.scrollTop

  // Stop interval if no listeners
  if(!Spot.listeners.length) {
    Spot.stop()
    return
  }

  // Skip this interval if scroll position is the same
  if(scrollTop === Spot.lastScrollTop && !Spot.forceRun) {
    requestAnimationFrame(Spot.interval)
    return
  }

  for(var index = 0, length = Spot.listeners.length; index < length; index++){
    var windowHeight = window.innerHeight
    var listener = Spot.listeners[index]
    var rect = listener.element.getBoundingClientRect()

    var screenTop = Math.floor(-rect.top)

    var screenBottom = Math.floor(-rect.bottom)
    var proximity = convertHeightToPixels(listener.proximity) || 0
    var above = screenTop + windowHeight + proximity < 0
    var below = screenBottom - proximity > 0
    var withinProximity = !above && !below
    var entering = withinProximity && !listener.withinProximityLastFrame
    var leaving = !withinProximity && listener.withinProximityLastFrame

    var eventTriggered = (listener.eventName === 'enter' && entering)

    if(eventTriggered) {
      listener.handler({
        entering,
        leaving
      })
    }

    if(eventTriggered && listener.triggerOnce) {
      Spot.removeListener(listener)
      index--
      length--
    }

    listener.withinProximityLastFrame = withinProximity
  }

  Spot.forceRun = false
  Spot.lastScrollTop = scrollTop
  requestAnimationFrame(Spot.interval)
}

var convertHeightToPixels = function(value) {
  // If value is string and contains %, multiply with window height
  if (typeof value === 'string') {
    var percent = parseInt(value.substr(0, value.length - 1), 10) / 100
    return window.innerHeight * percent
  }

  return value
}

var Mixin = function(options) {
  return {
    _getListenerOptions() {
      return assign({}, {
        element: this.getDOMNode(),
        handler: this.onSpot
      }, options)
    },

    componentDidMount() {
      this.spotListener = Spot.addListener(this._getListenerOptions())
    },

    componentWillUnmount() {
      Spot.removeListener(this.spotListener)
    }
  }
}

Spot.Mixin = Mixin
module.exports = Spot
