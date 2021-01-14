function generalStampz(date) {
    const splitted = date.split("-")
    const newDate = new Date(splitted[0], splitted[1] - 1, splitted[2])

    return newDate
}

module.exports = { generalStampz }