var Reflux = require('reflux')
var request = require('axios')
var map = require('lodash/collection/map')

var LineupStore = Reflux.createStore({

  init() {
    this.dayNames = ['wednesday', 'thursday', 'friday', 'saturday']
    this.days = {}
  },

  getDayNames() {
    return this.dayNames
  },

  getDay(weekday) {
    if(!this.days[weekday]) {
      this.days[weekday] = []

      request.get('https://blinding-inferno-1708.firebaseio.com/lineup/' + weekday + '.json').then(result => {
        this.days[weekday] = map(result.data, hour => {
          return hour
        })
        this.sortHours(this.days[weekday])
        this.trigger()
      })
    }

    return this.days[weekday]
  },

  sortHours(hours) {
    hours.sort((a, b) => {
      if(a.unixTimestamp < b.unixTimestamp) return -1
      if(a.unixTimestamp > b.unixTimestamp) return 1
    })
  }
})

module.exports = LineupStore
