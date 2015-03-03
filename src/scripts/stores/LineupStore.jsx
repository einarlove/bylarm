var Reflux = require('reflux')

var LineupStore = Reflux.createStore({

  init() {
    this.dayNames = ['wednesday', 'thursday', 'friday', 'saturday']
  },

  getDayNames() {
    return this.dayNames
  }

})

module.exports = LineupStore
