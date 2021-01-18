function convertTime(time) {
    return time.toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

module.exports = convertTime