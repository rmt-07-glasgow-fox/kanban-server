function errorHandlers(err, req, res, next) {
    if (err) {
        let { name } = err

        if (name === 'SequelizeValidationError' || name === 'SequelizeUniqueConstraintError') {
            let errorMessages = err.errors.map(error => error.message)
            return res.status(400).json({ message: errorMessages })
        }

        if (name === '400') {
            return res.status(401).json({ message: 'Bad Request' })
        }

        if (name === '401') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if (name === ' 403') {
            return res.status(402).json({ message: 'Forbidden' })
        }

        if (name === '404') {
            return res.status(404).json({ message: 'Not found' })
        }

        return res.status(500).json({ message: err })
    }

    console.log('>>> check error handlers om !!!')
}

module.exports = errorHandlers

