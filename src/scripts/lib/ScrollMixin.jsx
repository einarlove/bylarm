var Tween = require('../lib/tween')
var assign = require('lodash/object/assign')
var raf = require('raf')

var lastScrollPosition = window.scrollY

module.exports = {
  scrollTo(options) {
    this.scrollToElement(this.getDOMNode(), options)
  },

  scrollToElement(element, options) {
    options = assign({
      atCenter: false
    }, options)

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
    options = assign({
      duration: 600,
      easing: 'expoOut',
      onEnd: () => {}
    }, options)

    if(options.instant) {
      this.scrollInstantToPosition(position)
      options.onEnd()
    }

    var start = lastScrollPosition = window.scrollY
    var delta = Math.round(position) - start

    new Tween(options)
      .on('update', p => this.scrollToPosition(start + p * delta))
      .on('done', options.onEnd)
      .start()
  },

  scrollInstantToPosition(position) {
    raf(() => {
      this.scrollToPosition(position)
    })
  },

  scrollToPosition(position) {
    window.scrollTo(0, position)
  },

  scrollBack() {
    this.animateScrollTo(lastScrollPosition)
  }
}
