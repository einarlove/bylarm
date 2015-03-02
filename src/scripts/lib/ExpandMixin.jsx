var ExpandActions = require('../actions/ExpandActions')
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
    ExpandActions.expand(this.props.artist.id, this.getDOMNode())
    this.onExpand && this.onExpand()

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
    ExpandActions.shrink()
    this.onShrink && this.onShrink()

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

    this.onTransitionEnd && this.onTransitionEnd()
  },

  toggleExpand() {
    this.state.expanded ? this.shrink() : this.expand()
  }
}

module.exports = Mixin
