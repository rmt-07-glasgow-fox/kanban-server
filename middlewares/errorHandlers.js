function errorHandlers(err, req, res, next) {
    if (err) {
        let { name } = err

        if (name === 'SequelizeValidationError') {
            let errorMessages = err.errors.map(error => error.message)
            return res.status(400).json({ message: errorMessages })
        }

        if (name === '404') {
            return res.status(404).json({ message: 'Not found' })
        }

        return res.status(500).json({ message: err })
    }
}

module.exports = errorHandlers

