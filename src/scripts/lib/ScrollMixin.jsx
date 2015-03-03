var Tween = require('../lib/tween')
var defaults = require('lodash/object/defaults')

var lastScrollPosition = window.scrollY

var updateScroll = function(position) {

}

module.exports = {
  scrollTo(options) {
    this.scrollToElement(this.getDOMNode(), options)
  },

  scrollToElement(element, options) {
    options = defaults(options, {
      atCenter: false
    })

    var elementRect = element.getBoundingClientRect()
    var position = elementRect.top + window.scrollY

    if(options.atCenter) {
      position += (elementRect.height / 2) - (window.innerHeight / 2)
    }

    if(options.instant) {
      this.scrollToPosition(position)
    }
    else {
      this.animateScrollToPosition(position, options)
    }
  },

  animateScrollToPosition(position, options) {
    options = defaults(options, {
      duration: 600,
      easing: 'expoOut'
    })

    var start = lastScrollPosition = window.scrollY
    var delta = position - start

    new Tween(options)
      .on('update', p => this.scrollToPosition(start + p * delta))
      .on('done', options.onEnd)
      .start()
  },

  scrollToPosition(position) {
    window.scrollTo(0, position)
  },

  scrollBack() {
    this.animateScrollTo(lastScrollPosition)
  }
}
