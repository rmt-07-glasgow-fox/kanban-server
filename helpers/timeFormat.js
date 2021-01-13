const moment = require('moment')

module.exports = date => {
    return moment(date).format('D MMMM YYYY, h:mm a')
}