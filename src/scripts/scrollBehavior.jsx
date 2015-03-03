module.exports = {
  updateScrollPosition: function(position, actionType) {
    if(position) {
      window.scrollTo(0, position.y)
    }
  }
}
