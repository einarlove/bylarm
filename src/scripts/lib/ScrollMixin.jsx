var Tween = require('../lib/tween')

var lastScrollPosition = window.scrollY

var updateScroll = function(position) {
  window.scrollTo(0, position)
}

module.exports = {
  animateScrollToElement(element) {
    var elementPosition = document.body.scrollTop + element.getBoundingClientRect().top
    this.animateScrollTo(elementPosition)
  },

  animateScrollTo(position) {
    var start = lastScrollPosition = window.scrollY
    var delta = position - start

    var tween = new Tween({
      duration: 600,
      easing: 'expoOut'
    })
    .on('update', position => {
      updateScroll(start + position * delta)
    })
    .start()
  },

  scrollBack() {
    this.animateScrollTo(lastScrollPosition)
  }
}

// var TWEEN = require('tween.js')
// var raf = require('raf')

// var updateScroll = function(y) {
//   window.scrollTo(0, y)
// }

// var updateTween = function() {
//   TWEEN.update()
//   console.log('UPATING')
//   raf(updateTween)
// }

// module.exports = {
//   animateScrollToElement(element) {
//     var elementPosition = document.body.scrollTop + element.getBoundingClientRect().top
//     this.animateScrollTo(elementPosition)
//   },

//   animateScrollTo(position) {
//     var start = {y: window.scrollY}
//     var destination = {y: position}

//     var tween = new TWEEN.Tween(start)
//       .to(destination)
//       .onUpdate(function() {
//         updateScroll(this.y)
//       }).start()

//       updateTween()
//   }
// }
