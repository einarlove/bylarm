var Tween = require('../lib/tween')

var tweeningParams = {
  duration: 600,
  easing: 'expoOut'
}

var Mixin = {
  getInitialState() {
    return {
      expanded: false,
      expandTransition: 0
    }
  },

  expand() {
    this.setState({
      expanded: true,
      inTransition: true
    })

    var tween = new Tween(tweeningParams).start()
    tween.on('update', (position) => {
      this.setState({
        expandTransition: position
      })
    }).on('done', this.onExpandTransitionEnd)
  },

  shrink() {
    this.setState({
      expanded: false,
      inTransition: true
    })

    var tween = new Tween(tweeningParams).start()
    tween.on('update', (position) => {
      this.setState({
        expandTransition: 1 - position
      })
    }).on('done', this.onExpandTransitionEnd)
  },

  onExpandTransitionEnd() {
    this.setState({
      inTransition: false
    })

    if(this.onTransitionEnd) {
      this.onTransitionEnd()
    }
  },

  toggleExpand() {
    if(this.state.expanded) {
      this.shrink()
    } else {
      this.expand()
    }
  }
}

module.exports = Mixin
