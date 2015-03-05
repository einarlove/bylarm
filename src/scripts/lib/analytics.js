var initialized = false

var GoogleAnalytics = {
  id: 'UA-60419317-1'
}

function loadScript(url) {

  var scriptElement = document.createElement('script')
  var firstScript = document.scripts[0]

  scriptElement.src = url
  firstScript.parentNode.insertBefore(scriptElement, firstScript)
}

function initialize() {
  if (initialized) return

  initialized = true

  // Google Analytics
  if (GoogleAnalytics.id) {
    loadScript('//www.google-analytics.com/analytics.js')

    window.GoogleAnalyticsObject = 'ga'
    window.ga || (window.ga = function() {
      (window.ga.q = window.ga.q || []).push(arguments)
    })
    window.ga.l = +new Date()
    window.ga('create', GoogleAnalytics.id, 'auto')
  }
}

// Event
function track(event, properties) {
  initialize()

  properties = properties || {}

  // Google Analytics
  if (GoogleAnalytics.id) {
    window.ga('send', {
      hitType: 'event',
      eventAction: event,
      eventCategory: properties.category || 'All',
      eventLabel: properties.label,
      eventValue: properties.value,
      nonInteraction: properties.interaction === false
    })
  }
}

// Page view
function page(name, properties) {
  initialize()

  // Google Analytics
  if (GoogleAnalytics.id) {
    window.ga('send', {
      hitType: 'pageview',
      title: name
    })
  }
}

exports.track = track
exports.page = page
