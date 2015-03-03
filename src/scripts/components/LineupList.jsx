var React = require('react')
var {Link} = require('react-router')

require('styles/LineupList')

var LineupStore = require('../stores/LineupStore')

var LineupList = React.createClass({

  componentWillMount() {
    this.lineupDays = LineupStore.getDayNames()
  },

  render() {
    var lineupLinks = this.lineupDays.map((day, key) => {
      return <Link key={key} className="lineup-item" to="lineup" params={{day}}>{day}</Link>
    })

    return (
      <div className="lineup-list">
        {lineupLinks}
      </div>
    )
  }
})

module.exports = LineupList
